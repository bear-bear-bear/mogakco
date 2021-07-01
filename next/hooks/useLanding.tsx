import useSWR from 'swr';

type State = {
  email: string | null;
};

export const LANDING_KEY = 'pages/landing';

const useLanding = () => {
  const initialData: State = {
    email: null,
  };

  const { data: { email } = initialData, mutate: updateLanding } =
    useSWR<State>(LANDING_KEY, () => initialData);

  return {
    email,
    updateLanding,
  };
};

export default useLanding;
