import '~/components/common/globalStyle.css';
import '~/components/common/reset.css';
import wrapper from '~/store/configureStore';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
