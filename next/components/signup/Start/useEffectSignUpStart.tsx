import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';
import useTypedDispatch from '~/hooks/useTypedDispatch';
import useTypedSelector from '~/hooks/useTypedSelector';
import { saveEmail as saveLandingEmail } from '~/redux/reducers/landing';
import { verifyEmailRequest } from '~/redux/reducers/signup';

const useEffectSignUpStart = (setEmail: Dispatch<SetStateAction<string>>) => {
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const landingEmail = useTypedSelector(({ landing }) => landing.email);

  useEffect(() => {
    if (landingEmail === null) return;

    setEmail(landingEmail);
    dispatch(saveLandingEmail(null));
  }, [dispatch, landingEmail, setEmail]);

  useEffect(() => {
    const { success, email: verifiedEmail } = router.query;

    const isQuery = Boolean(success);
    if (!isQuery) {
      return;
    }

    if (success === 'true') {
      dispatch(verifyEmailRequest(verifiedEmail));
    }
    router.push('/signup', undefined, { shallow: true });
  }, [dispatch, router]);
};

export default useEffectSignUpStart;
