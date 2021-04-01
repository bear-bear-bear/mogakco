import GlobalStyle from '~/components/globalStyle';
import wrapper from '~/store/configureStore';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />;
    </>
  );
};

export default wrapper.withRedux(App);
