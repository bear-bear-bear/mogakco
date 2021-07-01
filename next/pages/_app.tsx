import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import wrapper from '@redux/store/configureStore';
import GlobalStyles, { customGlobalStyles } from '@components/globalStyles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS={false}>
      <GlobalStyles styles={customGlobalStyles} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
