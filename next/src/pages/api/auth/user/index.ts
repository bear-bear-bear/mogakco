import type { NextApiRequest, NextApiResponse } from 'next';
import type { IUserGetResponse } from 'typings/auth';
import tempEvents from './tempEvents';

const fakeUserResponse: IUserGetResponse = {
  isLoggedIn: true,
  id: 32,
  username: 'mogauser',
  email: 'mogakco35@gmail.com',
  skills: [
    {
      id: 5,
      name: '정보보안',
    },
    {
      id: 6,
      name: '운영체제',
    },
    {
      id: 9,
      name: 'IOS',
    },
    {
      id: 11,
      name: '알고리즘',
    },
    {
      id: 12,
      name: '풀스택',
    },
  ],
  job: {
    id: 6,
    name: '보안 솔루션 개발자',
  },
  events: tempEvents,
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
      statusCode: 405,
    });
    return;
  }

  res.status(200).json(fakeUserResponse);
};

export default handler;
