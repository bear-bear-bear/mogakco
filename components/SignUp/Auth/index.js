import GoogleLogo from 'assets/svg/btn_google_light_normal_ios.svg';

import { descriptionStyles, socialWrapper, Social } from './style';

import {
  contentWrapperStyles,
  titleStyles,
  submitBtnStyles,
  formStyles,
  Input,
} from '../common/styles';

const index = () => (
  <div css={contentWrapperStyles}>
    <h1 css={titleStyles}>이메일을 입력하세요</h1>
    <form action="" css={formStyles}>
      <Input type="email" placeholder="example@gmail.com" page="auth" />
      <button type="submit" css={submitBtnStyles}>
        인증메일 발송
      </button>
    </form>
    <p css={descriptionStyles}>
      이메일 인증을 성공하면 회원가입을 계속 진행할 수 있습니다.
    </p>
    <br />
    <p css={descriptionStyles}>
      이미 계정이 있으신가요? 여기를 눌러 로그인하세요.
    </p>
    <div css={socialWrapper}>
      <Social service="google">
        <GoogleLogo />
        <span>Sign up with Google</span>
      </Social>
      <Social service="github">
        <div
          style={{
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="assets/images/GitHub-Mark-Light-32px.png"
            alt=""
            style={{ margin: '0 4px' }}
          />
        </div>
        <span>Sign up with Github</span>
      </Social>
    </div>
  </div>
);

export default index;
