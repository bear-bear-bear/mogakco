import signUpWrapper from './style';
import Header from './Header';
import ProgressBar from './ProgressBar';
import Auth from './Auth';
import Info from './Info';
import Interest from './Interest';
import Complete from './Complete';

const index = () => {
  return (
    <div css={signUpWrapper}>
      <Header />
      <ProgressBar />
      <Auth />
      <Info />
      <Interest />
      <Complete />
    </div>
  );
};

export default index;
