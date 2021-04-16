import LeftContentBlock from './LeftContentBlock';
import RightContentBlock from './RightContentBlock';

const ContentBlock = props => {
  /* eslint-disable react/destructuring-assignment */
  // 컴포넌트로 props를 그대로 넘기기 위한 eslint-disable입니다.
  if (props.type === 'left') return <LeftContentBlock {...props} />;
  if (props.type === 'right') return <RightContentBlock {...props} />;
  return null;
};

export default ContentBlock;
