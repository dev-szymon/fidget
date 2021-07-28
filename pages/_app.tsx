import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import ContextProvider from '../context/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  );
}
export default MyApp;
