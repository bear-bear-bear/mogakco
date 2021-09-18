import type { NextApiRequest, NextApiResponse } from 'next';
import type { IAccountEditProps, IUserInfo } from 'typings/auth';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const userInfo: IAccountEditProps = req.body;

  if (req.method !== 'PUT') {
    res.status(405).json({
      message: 'Method not allowed',
      statusCode: 405,
    });
    return;
  }

  console.log('다음 정보로 PUT 요청이 왔지롱', userInfo);

  const changedUser: IUserInfo = {
    id: 1,
    email: 'mogakco35@gmail.com',
    username: 'mogauser',
    skills: [
      {
        id: 1,
        name: '리눅스',
      },
      {
        id: 13,
        name: '풀스택',
      },
    ],
    job: {
      id: 8,
      name: '보안 관제',
    },
  };

  res.status(200).json({
    message: '계정 정보가 성공적으로 수정되었습니다.',
    statusCode: 200,
    user: changedUser,
  });
};

export default handler;
