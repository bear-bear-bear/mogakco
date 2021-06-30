import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import useTypedDispatch from '~/hooks/useTypedDispatch';
import useTypedSelector from '~/hooks/useTypedSelector';
import { saveEmail as saveLandingEmail } from '~/redux/reducers/landing';
import { FormInputs } from '.';

const useEffectSignUpStart = (setEmail: UseFormSetValue<FormInputs>) => {
  const dispatch = useTypedDispatch();
  const landingEmail = useTypedSelector(({ landing }) => landing.email);

  useEffect(() => {
    if (landingEmail === null) return;

    setEmail('email', landingEmail);
    dispatch(saveLandingEmail(null));
  }, [dispatch, landingEmail, setEmail]);
};

export default useEffectSignUpStart;
