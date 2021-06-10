import type { AppProps } from 'next/app';
import wrapper from '~/redux/store/configureStore';
import GlobalStyle from '~/components/globalStyles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
