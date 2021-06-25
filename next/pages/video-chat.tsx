import CustomHead from '~/components/common/CustomHead';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const VideoChat = () => {
  return (
    <>
      <CustomHead {...pageProps} />
      <div>채팅페이지 입니다</div>
    </>
  );
};

export default VideoChat;
