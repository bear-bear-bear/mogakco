import { useRef, useState, useCallback } from 'react';
import { GetServerSideProps } from 'next';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/landing/Container';
import Header from '@components/landing/Header';
import ContentBlock from '@components/landing/ContentBlock';
import MiddleBlock from '@components/landing/MiddleBlock';
import Footer from '@components/landing/Footer';
import ScrollTop from '@components/common/ScrollTop';
import Button from '@components/common/Button';
import { isDevelopment } from '@lib/enviroment';
import { authProlongTestApi, refreshAccessTokenApiSSR } from '@lib/apis';

export type Props = {
  isLogin: boolean;
};

const pageProps = {
  title: '모여서 각자 코딩 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const Landing = ({ isLogin }: Props) => {
  const emailEl = useRef<HTMLInputElement>(null);
  const [isTestBtnLoading, setIsTestBtnLoading] = useState<boolean>(false);

  const onClickTestButton = useCallback(async () => {
    setIsTestBtnLoading(true);
    await authProlongTestApi();
    setIsTestBtnLoading(false);
  }, []);

  return (
    <>
      <CustomHead {...pageProps} />
      <Header isLogin={isLogin} />
      <Container>
        <ScrollTop />
        {isDevelopment && (
          <Button
            type="button"
            outline
            style={{ float: 'right' }}
            onClick={onClickTestButton}
            $loading={isTestBtnLoading}
          >
            로그인 연장 테스트 하기
          </Button>
        )}
        <ContentBlock
          type="left"
          title="혼자 하는 코딩은 쓰니까."
          content="같이 코딩할까요, 지금 그 자리에서."
          imgName="landing_sleep.svg"
          isFirstBlock
          emailEl={emailEl}
        />
        <MiddleBlock
          subtitle="모여서 각자 코딩"
          title="모각코는, 개발자들을 위한 무료 화상채팅 서비스입니다"
          content="다른 개발자들과 소통하고 경쟁하며, 더 나은 자신을 향해 나아갈 동기를 얻어보세요!"
          onClickButton={() => emailEl.current?.focus()}
        />
        <ContentBlock
          type="right"
          title="일정을 계획"
          content="메모와 일정을 캘린더에 정리하고, 기간별로 공부한 시간도 확인해보세요."
          imgName="landing_grow-up.svg"
        />
        <ContentBlock
          type="left"
          title="랭킹 시스템"
          content="같은 분야의 개발자들과 비교한 자신의 공부시간 순위를 알 수 있습니다."
          imgName="landing_run.svg"
        />
        <ContentBlock
          type="right"
          title="철저한 익명제"
          content="기존 오프라인 코딩 모임의 가장 큰 문제점인 과한 네트워킹, 친목 등을 방지하고자, 모각코는 철저한 익명제로 운영됩니다."
          imgName="landing_privacy.svg"
        />
      </Container>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
}) => {
  try {
    await refreshAccessTokenApiSSR(headers);
    return { props: { isLogin: true } };
  } catch (err) {
    return { props: { isLogin: false } };
  }
};

export default Landing;
