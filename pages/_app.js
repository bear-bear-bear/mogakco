import GlobalStyle from '~/components/globalStyles';
import wrapper from 'redux/store/configureStore';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
