'use client';
import { useState } from 'react';

import classnames from 'classnames';
import {
  ChevronLeft,
  ChevronRight,
  Languages,
  Volume1,
  Volume2,
} from 'lucide-react';
import { useDisplayVocabulary, useVocabStore } from 'src/store';
import { WordType } from 'src/type/word.type';

import vocabularyList from '@/constants/vocubulary';

export default function Home() {
  const { count } = useVocabStore();
  const { displayVocabulary } = useDisplayVocabulary();
  const [showDetails, setShowDetails] = useState(true);
  const [showEng, setShowEng] = useState(true);

  const currentWord = displayVocabulary[count];

  return (
    <div className='p-4 flex justify-between flex-col h-full'>
      {/* Action Menu */}
      <div className='text-center text-xl'>
        <span>
          {count + 1} / {displayVocabulary.length}
        </span>
      </div>

      {/* Word Card */}
      <div className='mt-20 grow'>
        <WordCard
          word={currentWord}
          showDetails={showDetails}
          showEng={showEng}
        />
      </div>

      {/* Control Bar */}
      <div className='grid gap-4'>
        <div className='flex gap-4'>
          <button
            className={classnames(
              'bg-blue-200 px-6 py-4 rounded-xl flex items-center',
              {
                'opacity-30': !showDetails,
              }
            )}
            onClick={() => setShowDetails(!showDetails)}
          >
            <Languages />
          </button>
          <button
            className={classnames(
              'bg-blue-200 px-6 py-4 rounded-xl flex items-center font-black text-xl',
              {
                'opacity-30': !showDetails,
              }
            )}
            onClick={() => setShowEng(!showEng)}
          >
            EN
          </button>
        </div>
        <div className='flex flex-wrap gap-2'>
          <VocubButton vocabKey='sympton' className='bg-yellow-200' />
          <VocubButton vocabKey='illnesses' className='bg-orange-200' />
          <VocubButton vocabKey='department' className='bg-red-200' />
          <VocubButton vocabKey='vaccine' className='bg-green-200' />
          <VocubButton vocabKey='medication' className='bg-purple-200' />
          <VocubButton vocabKey='test' className='bg-pink-200' />
          <VocubButton vocabKey='procedures' className='bg-teal-200' />
          <VocubButton vocabKey='pain' className='bg-cyan-200' />
        </div>
      </div>
    </div>
  );
}

const WordCard = ({
  word,
  showDetails,
  showEng,
}: {
  word: WordType;
  showDetails: boolean;
  showEng: boolean;
}) => {
  const { setCount, count } = useVocabStore();
  const { vocubLen } = useDisplayVocabulary();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const toSpeakOut = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // or 'zh-HK' if using Chinese
    utterance.rate = 0.3; // Adjust the rate as needed
    utterance.pitch = 1.4; // Adjust the pitch as needed
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    speechSynthesis.speak(utterance);
  };

  if (!word) return <div className='text-center'>No word available</div>;
  return (
    <div className='flex flex-col items-center gap-10'>
      <h3 className='text-3xl font-black h-10'>{showEng && word.term}</h3>

      <div className='flex flex-col items-center gap-10 h-60'>
        {showDetails && (
          <>
            <h3 className='text-2xl'>{word.chinese}</h3>

            <div className='p-4 border border-dotted rounded-xl flex flex-col items-center gap-4'>
              <p>{word.chinese_meaning}</p>
              <p>{word.english_meaning}</p>
            </div>
          </>
        )}
      </div>

      <div className='flex gap-10 items-center'>
        <button
          className='bg-amber-200 p-4 rounded-full'
          onClick={() => setCount(count > 0 ? count - 1 : vocubLen - 1)}
          disabled={count === 0}
        >
          <ChevronLeft />
        </button>
        <button
          className={classnames(
            'bg-green-200 px-10 py-2 rounded-xl transition',
            {
              'shadow-2xl scale-105': isSpeaking,
            }
          )}
          onClick={() => toSpeakOut(word.term)}
          disabled={!word.term || isSpeaking}
        >
          {isSpeaking ? <Volume2 size={40} /> : <Volume1 size={40} />}
        </button>
        <button
          className='bg-amber-200 p-4 rounded-full'
          onClick={() => setCount(count < vocubLen - 1 ? count + 1 : 0)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

const VocubButton = ({
  vocabKey,
  className,
}: {
  vocabKey: keyof typeof vocabularyList;
  className?: string;
}) => {
  const { activeVocabulary, setActiveVocabulary } = useVocabStore();

  return (
    <button
      className={classnames(
        'bg-blue-200 px-4 py-2 rounded-xl flex items-center',
        {
          'opacity-30': !activeVocabulary[vocabKey],
        },
        className
      )}
      onClick={() =>
        setActiveVocabulary({
          ...activeVocabulary,
          [vocabKey]: !activeVocabulary[vocabKey],
        })
      }
    >
      <span className='font-black uppercase black w-4'>
        {vocabKey.charAt(0)}
      </span>
    </button>
  );
};
