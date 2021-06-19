// svg를 모듈로 사용하기 위한 설정입니다
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
