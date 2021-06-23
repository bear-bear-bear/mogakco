describe('랜딩 페이지', () => {
  it('페이지 로드에 성공한다.', () => {
    cy.log('첫 화면 페이지에 방문합니다.');
    cy.visit('http://localhost:3000');
  });
});
