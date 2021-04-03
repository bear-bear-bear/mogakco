import { useSelector } from 'react-redux';
// import makeGetInput from '~/selectors/common/commonEx';
import { changeInput } from '~/actions/common/commonEx';
import CommonEx from '~/components/common/CommonEx';
import useActions from '~/lib/useActions';

const CommonExContainer = () => {
  // const input = useSelector(makeGetInput);
  const input = useSelector(({ commonEx }) => commonEx.input);
  const [onChangeInput] = useActions([changeInput], []);

  return <CommonEx input={input} onChangeInput={onChangeInput} />;
};

export default CommonExContainer;
