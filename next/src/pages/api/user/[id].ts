import { REFRESH_TOKEN } from '@lib/token';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method !== 'DELETE') {
    res.status(405).json({
      message: 'Method not allowed',
      statusCode: 405,
    });
    return;
  }

  console.log(`${id}번 계정을 가짜로 삭제하지롱`);

  res.setHeader('Set-Cookie', `${REFRESH_TOKEN}=; path=/; expires=-1`);
  res.status(204).json({
    message: '계정이 성공적으로 삭제되었습니다.',
    statusCode: 204,
  });
};

export default handler;
