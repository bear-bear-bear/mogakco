import { render, screen } from '@testing-library/react';
import TestRenderer from '../components/TestRenderer.test';

describe('리액트 테스트 케이스', () => {
  test('렌더링 테스트', () => {
    render(<TestRenderer />);
    screen.getByText('여행기분떡상하기');
  });
});
