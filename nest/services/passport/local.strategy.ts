import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport';

@Injectable()
export default class LocalStrategy extends Strategy {}
