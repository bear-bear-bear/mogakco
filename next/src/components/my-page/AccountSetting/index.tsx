import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

import Button from '@components/common/Button';
import toSelectOptions from '@lib/toSelectOptions';
import token from '@lib/token';
import { logAxiosError } from '@lib/apiClient';
import { deleteAccountApi } from '@lib/apis';
import type { UserMutator } from '@hooks/useUser';
import type { IOptionalPageProps as SelectsOptions } from '@pages/sign-up/optional';
import type { IUserInfo } from 'typings/auth';
import type { GeneralAxiosError } from 'typings/common';

import UsernameSection from './section/Username';
import EmailSection from './section/Email';
import JobSelectSection from './section/JobSelect';
import SkillsSelectSection from './section/SkillsSelect';
import * as S from './style';

interface AccountSettingProps extends UserMutator, SelectsOptions {
  user: IUserInfo;
}

type RequiredFields = Pick<IUserInfo, 'username' | 'email'>;
type OptionalFieldsValue = {
  skills: string[] | null;
  job: string | null;
};

const AccountSetting = ({
  user: { id, skills, job, username, email },
  mutateUser,
  skillOptions,
  jobOptions,
}: AccountSettingProps) => {
  const initialRequiredFields: RequiredFields = useMemo(
    () => ({
      username,
      email,
    }),
    [email, username],
  );
  const initialOptionalFieldsValue: OptionalFieldsValue = useMemo(
    () => ({
      skills: skills?.map((skill) => skill.id.toString()) || null,
      job: job?.id?.toString() || null,
    }),
    [skills, job],
  );

  const [skillIds, setSkillIds] = useState<string[] | null>(
    initialOptionalFieldsValue.skills,
  );
  const [jobId, setJobId] = useState<string | null>(
    initialOptionalFieldsValue.job,
  );
  const hiddenSubmitButtonEl = useRef<HTMLButtonElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid: isRequiredFieldsValid },
  } = useForm<RequiredFields>({
    mode: 'all',
    defaultValues: initialRequiredFields,
  });
  const watchedRequiredFields = watch();

  const isSubmittable = useCallback(() => {
    const currOptionalFieldsValue: OptionalFieldsValue = {
      skills: skillIds,
      job: jobId,
    };

    const isOptionalFieldsChanged = () =>
      !_.isEqual(initialOptionalFieldsValue, currOptionalFieldsValue);
    const isRequiredFieldsChanged = () =>
      !_.isEqual(initialRequiredFields, watchedRequiredFields);

    return (
      isRequiredFieldsValid &&
      (isOptionalFieldsChanged() || isRequiredFieldsChanged())
    );
  }, [
    initialOptionalFieldsValue,
    initialRequiredFields,
    isRequiredFieldsValid,
    jobId,
    skillIds,
    watchedRequiredFields,
  ]);

  const handleAccountDeleteButtonClick = async () => {
    // TODO: 모달 추가 후 '정말로 삭제하시겠습니까?' 추가
    try {
      await deleteAccountApi(id);
      mutateUser({ isLoggedIn: false });
      token.delete();
    } catch (err) {
      logAxiosError(err as GeneralAxiosError);
    }
  };

  const handleSaveButtonClick = () => {
    if (!isSubmittable()) return;
    hiddenSubmitButtonEl.current?.click();
  };
  const handleFormSubmit = (info: RequiredFields) => {
    alert('submit');
    // TODO: 유저 정보 저장 요청 (PUT)
  };

  useEffect(() => {
    setIsButtonDisabled(!isSubmittable());
  }, [isSubmittable]);

  return (
    <S.Main>
      <header>
        <S.MainTitle>계정 설정</S.MainTitle>
      </header>
      <S.Form action="" onSubmit={handleSubmit(handleFormSubmit)}>
        <UsernameSection register={register} errors={errors} />
        <EmailSection register={register} errors={errors} />

        <S.DevideTextLine>선택 정보</S.DevideTextLine>

        <JobSelectSection
          options={jobOptions}
          setId={setJobId}
          defaultValue={toSelectOptions(job)[0]}
        />
        <SkillsSelectSection
          options={skillOptions}
          setIds={setSkillIds}
          defaultValue={toSelectOptions(skills)}
        />

        <S.DevideTextLine />

        <Button
          type="button"
          color="red"
          outline
          fullWidth
          onClick={handleAccountDeleteButtonClick}
        >
          계정 삭제
        </Button>

        <S.HiddenButton ref={hiddenSubmitButtonEl} type="submit" />
      </S.Form>

      <S.Footer>
        <Button
          color="black"
          scale="large"
          onClick={handleSaveButtonClick}
          disabled={isButtonDisabled}
          $loading={false}
        >
          저장
        </Button>
      </S.Footer>
    </S.Main>
  );
};

export default React.memo(AccountSetting);
