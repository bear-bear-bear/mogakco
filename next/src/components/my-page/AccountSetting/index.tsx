import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

import Button from '@components/common/Button';
import Warning from '@components/common/Warning';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import { usernameRule, emailRule } from '@lib/regex';
import JobSelect from '@components/sign-up/Optional/JobSelect';
import SkillsSelect from '@components/sign-up/Optional/SkillsSelect';
import type { IOptionalPageProps as SelectsOptions } from '@pages/sign-up/optional';
import type { IUserInfo } from 'typings/auth';

import toSelectOptions from '@lib/toSelectOptions';
import * as S from './style';

interface AccountSettingProps extends SelectsOptions {
  user: IUserInfo;
}
type ChangableInfo = Omit<IUserInfo, 'id'>;

const AccountSetting = ({
  user: { id, skills, job, ...requiredInfo },
  skillOptions,
  jobOptions,
}: AccountSettingProps) => {
  const defaultValues = requiredInfo;

  const [skillIds, setSkillIds] = useState<string[] | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const hiddenSubmitButtonEl = useRef<HTMLButtonElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ChangableInfo>({
    mode: 'all',
    defaultValues,
  });
  const watchedFields = watch();

  const isSubmittable = useCallback(
    () => isValid && !_.isEqual(defaultValues, watchedFields),
    [defaultValues, isValid, watchedFields],
  );

  const handleFormSubmit = (info: ChangableInfo) => {
    console.log('submit');
    // TODO: 유저 정보 저장 요청 (PUT)
  };
  const handleSaveButtonClick = () => {
    if (!isSubmittable()) return;
    hiddenSubmitButtonEl.current?.click();
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
        <InputWrapper>
          <Label htmlFor="username" direction="bottom">
            유저명
          </Label>
          <S.Input
            type="text"
            id="username"
            spellCheck="false"
            {...register('username', {
              pattern: {
                value: usernameRule,
                message:
                  '규칙에 맞는 유저명을 입력해주세요 (영문/한글/숫자/마침표 1-12자).',
              },
              required: true,
            })}
          />
        </InputWrapper>
        {errors.username && <Warning>{errors.username.message}</Warning>}
        <InputWrapper>
          <Label htmlFor="email" direction="bottom">
            이메일
          </Label>
          <S.Input
            type="text"
            id="email"
            spellCheck="false"
            {...register('email', {
              pattern: {
                value: emailRule,
                message: '올바른 형식의 이메일을 입력해주세요.',
              },
              required: true,
            })}
          />
        </InputWrapper>
        {errors.email && <Warning>{errors.email.message}</Warning>}

        {/* TODO: select option 정상 렌더링 되는지 확인 */}
        <JobSelect
          options={jobOptions}
          setId={setJobId}
          defaultValue={toSelectOptions(job)[0]}
        />
        <SkillsSelect
          options={skillOptions}
          setIds={setSkillIds}
          defaultValue={toSelectOptions(skills)}
        />

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

export default AccountSetting;
