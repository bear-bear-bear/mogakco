import jwt from 'jsonwebtoken';

export default function jwtVerifyPromise(accessToken: string, secret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}
