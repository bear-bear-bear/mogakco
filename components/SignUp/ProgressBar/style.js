import styled from '@emotion/styled';

export const ProgressBarWrapper = styled.div`
  height: 0.625rem;
  width: 100%;
  background-color: var(--color-green-0);
  border-radius: 0.3125rem;
  margin-top: 2rem;
`;

const detectProgress = progress => {
  if (progress[2]) {
    return 100;
  }
  if (progress[1]) {
    return 60;
  }
  if (progress[0]) {
    return 20;
  }
  return 0;
};

export const ProgressBarFiller = styled.div(({ fill }) => ({
  height: '100%',
  width: `${detectProgress(fill)}%`,
  backgroundColor: 'var(--color-blue-1)',
  borderRadius: 'inherit',
  transition: '1s width ease-in-out',
}));
