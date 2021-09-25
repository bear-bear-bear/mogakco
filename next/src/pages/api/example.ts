import { REFRESH_TOKEN } from '@lib/token';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method not allowed',
      statusCode: 405,
    });
    return;
  }

  res.setHeader('Set-Cookie', `${REFRESH_TOKEN}=; path=/; expires=-1`); // 리프레쉬 토큰 삭제
  res.status(200).json({
    message: '뭔지 모르겠는데 성공했어요',
    statusCode: 200,
    id,
  });
};

export default handler;
