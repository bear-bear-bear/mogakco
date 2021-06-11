import { Injectable, PipeTransform } from '@nestjs/common';
import { IValueProps, RValueProps } from '@typing/auth';

@Injectable()
export default class ParseJoinPipe implements PipeTransform<IValueProps, RValueProps> {
  parseNumberArray(array: string[] | number[] | null) {
    if (array === null) {
      return null;
    }
    if (array.length === 0) {
      return null;
    }
    return array.map(s => Number(s));
  }

  parseNumber(data: string | number | null) {
    if (data === null) {
      return null;
    }
    return Number.isNaN(Number(data)) ? null : Number(data);
  }

  transform(value: IValueProps): RValueProps {
    return {
      ...value,
      skills: this.parseNumberArray(value.skills),
      job: this.parseNumber(value.job),
    };
  }
}
