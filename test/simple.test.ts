import jest from 'jest';

describe('컨트롤러와 서비스 간단 테스트', () => {
  it('2 + 2는 4가 된다.', () => {
    expect(2 + 2).toBe(4);
  });

  it('jest의 버전은 몇일까?', () => {
    expect(jest.getVersion()).toBeTruthy();
  });
});
