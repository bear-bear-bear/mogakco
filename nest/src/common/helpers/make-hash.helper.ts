import * as bcrypt from 'bcrypt';

export type ResolveType = (e: string) => void;

/**
 * @desc 평문을 해시화 합니다.
 * @param plain 평문 값
 */
export default async function makeHashHelper(plain: string): Promise<string> {
  return new Promise((resolve: ResolveType, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(plain, salt, (hashErr, hash) => {
        if (hashErr) reject(hashErr);
        resolve(hash);
      });
    });
  });
}
