import {Controller, Get, Post} from '@nestjs/common';
import {AppService} from "../services/app.service";

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('ab*cd')
  findAllWildCard(): string {
    return 'This route uses a wildcard';
  }
}
