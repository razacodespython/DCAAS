// import type { AppProps } from 'next/app';
// import '@/styles/globals.css';
// import { ChakraProvider } from '@chakra-ui/react';

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <ChakraProvider>
//       <Component {...pageProps} />
//     </ChakraProvider>
//   );
// }

// pages/_app.tsx
import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
