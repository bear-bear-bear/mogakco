import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

type Decorator = MethodDecorator | (MethodDecorator & ClassDecorator);

export default function decoratorHelper(tag: string, ...decorators: Decorator[]) {
  return applyDecorators(ApiTags(tag), ...decorators);
}
