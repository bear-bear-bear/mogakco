import { Label, TextArea } from './style';

const colorList = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'navy',
  'purple',
];

const CommonEx = ({ input, onChangeInput }) => {
  const onChange = e => {
    onChangeInput(e.target.value);
  };
  const color = colorList[input.length % 7];
  console.log(input);
  return (
    <>
      <Label htmlFor="commonExample">
        common 컴포넌트의 예시입니다
        <TextArea
          defalutValue={input}
          color={color}
          id="commonExample"
          name="rainbow"
          placeholder="레인보우"
          onChange={onChange}
        />
      </Label>
    </>
  );
};

export default CommonEx;
