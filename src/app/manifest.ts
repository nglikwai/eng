import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vacub Cat',
    short_name: 'Vacub',
    description: 'A Vocabulary Learning App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/file.svg',
        sizes: '192x192',
        type: 'image/svg',
      },
      {
        src: '/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg',
      },
    ],
  };
}
