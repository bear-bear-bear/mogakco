import type { NextApiRequest, NextApiResponse } from 'next';

const fakeDB = {
  create: async (blob: Blob) => {
    const createdBlobInfo = {
      url: 'https://example.image-url.com/1234',
    };
    return createdBlobInfo;
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method not allowed',
      statusCode: 405,
    });
    return;
  }
  const { image } = req.body;
  console.log('이런게 왔어용', image);

  const { url } = await fakeDB.create(image);

  res.status(201).json({
    message: '이미지 저장 완료',
    statusCode: 201,
    url,
  });
};

export default handler;
