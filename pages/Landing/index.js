import Container from '~/components/Landing/Container';
import Header from '~/components/Landing/Header';
import ContentBlock from '~/components/Landing/ContentBlock';
import MiddleBlock from '~/components/Landing/MiddleBlock';
import Footer from '~/components/Landing/Footer';

const Landing = () => {
  return (
    <Container>
      <Header />
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
