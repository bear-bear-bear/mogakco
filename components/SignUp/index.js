import SignUpWrapper from './style';
import Header from './Header';
import ProgressBar from './ProgressBar';
import Auth from './Auth';

const index = () => {
  return (
    <div css={SignUpWrapper}>
      <Header />
      <ProgressBar />
      <Auth />
    </div>
  );
};

export default index;
