import wrapper from '~/redux/store/configureStore';
import GlobalStyle from '~/components/globalStyles';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
