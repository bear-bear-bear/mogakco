import React, { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import Fade from 'react-reveal/Fade';
import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';

import useInput from '@hooks/useInput';
import type { ILeftContentBlockProps } from '@components/landing/ContentBlock';

import * as S from './style';

const LeftContentBlock = ({
  title,
  content,
  imgName,
  isFirstBlock,
  emailEl,
}: ILeftContentBlockProps) => {
  const router = useRouter();
  const [email, onChangeEmail, setEmail] = useInput('');

  const toSignUp = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/sign-up',
      query: { email },
    });
  };

  return (
    <S.LeftBlockContainer isFirstBlock={isFirstBlock}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="center"
        align="center"
      >
        <Box w={{ base: 'full', lg: '50%' }} order={{ base: 1, lg: 0 }}>
          <Fade left>
            <S.ContentWrapper isFirstBlock={isFirstBlock}>
              <h1>{title}</h1>
              <p>{content}</p>
              {isFirstBlock && (
                <S.FirstBlockForm onSubmit={toSignUp} spellCheck="false">
                  <S.FirstBlockInput
                    ref={emailEl}
                    type="email"
                    value={email}
                    isEmail={Boolean(email)}
                    resetEmail={() => setEmail('')}
                    onChange={onChangeEmail}
                    placeholder="이메일 입력"
                    spellCheck="false"
                    required
                  />
                  <S.FirstBlockJoinButton color="blue" type="submit">
                    회원가입
                  </S.FirstBlockJoinButton>
                </S.FirstBlockForm>
              )}
            </S.ContentWrapper>
          </Fade>
        </Box>
        <Box w={{ base: '75%', lg: '50%' }} order={{ base: 0, lg: 1 }}>
          <Fade right>
            <Image
              src={`/svg/${imgName}`}
              layout="responsive"
              width={1000}
              height={700}
            />
          </Fade>
        </Box>
      </Flex>
    </S.LeftBlockContainer>
  );
};

export default LeftContentBlock;
