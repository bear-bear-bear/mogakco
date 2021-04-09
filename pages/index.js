import Head from 'next/head';

import Container from '~/components/Landing/Container';
// import Header from '~/components/Landing/Header';
import ContentBlock from '~/components/Landing/ContentBlock';
import MiddleBlock from '~/components/Landing/MiddleBlock';
import Footer from '~/components/Landing/Footer';

import 'antd/dist/antd.css';

const Landing = () => {
  return (
    <Container>
      <Head>
        <title>모여서 각자 코딩 - Mogakco</title>
      </Head>
      {/* <Header /> */}
      <ContentBlock type="left" />
      <MiddleBlock />
      <ContentBlock type="right" />
      <ContentBlock type="left" />
      <ContentBlock type="right" />
      {/* <Footer /> */}
    </Container>
  );
};

export default Landing;
