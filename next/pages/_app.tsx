import type { AppProps } from 'next/app';
import wrapper from '~/redux/store/configureStore';
import GlobalStyles, { customGlobalStyles } from '~/components/globalStyles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles styles={customGlobalStyles} />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
