import CustomHead from '~/components/common/CustomHead';
import Container from '~/components/Landing/Container';
import Header from '~/components/Landing/Header';
import ContentBlock from '~/components/Landing/ContentBlock';
import MiddleBlock from '~/components/Landing/MiddleBlock';
import Footer from '~/components/Landing/Footer';

import 'antd/dist/antd.css';

const Landing = () => {
  const pageProps = {
    title: '모여서 각자 코딩 - Mogakco',
    description: 'Free online video chat for developers',
    url: '', // TODO: 도메인 정해지면 url에 추가하기
    locale: 'ko_KR',
  };

  return (
    <Container>
      <CustomHead {...pageProps} />
      <Header isLoggedIn={false} />
      <ContentBlock type="left" />
      <MiddleBlock />
      <ContentBlock type="right" />
      <ContentBlock type="left" />
      <ContentBlock type="right" />
      <Footer />
    </Container>
  );
};

export default Landing;
