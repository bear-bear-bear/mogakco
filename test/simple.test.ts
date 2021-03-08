// eslint-disable-next-line import/extensions,import/no-unresolved
import { returnTwo } from './testModule';

describe('컨트롤러와 서비스 간단 테스트', () => {
  it('2 + 2는 4가 된다.', () => {
    expect(returnTwo()).toBe(4);
  });
});
