import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 서버단 API 작성 전 테스트용 api
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    isLoggedIn: true,
  });
  // res.json({
  //   isLoggedIn: false,
  // });
};
