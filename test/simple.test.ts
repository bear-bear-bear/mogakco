import { AppController } from "../dist/app.controller";
import { AppService } from "../services/app.service";

describe('컨트롤러와 서비스 간단 테스트', function () {

  it('2 + 2는 4가 된다.', () => {
    expect(2 + 2).toBe(4);
  });
});