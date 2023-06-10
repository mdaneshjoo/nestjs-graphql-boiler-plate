import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type Mode = 'DEV' | 'PROD';
@Injectable()
export default class AppConfigService {
  constructor(private configService: ConfigService) {}

  get PORT(): number {
    return this.configService.get<number>('App.PORT');
  }

  get NODE_ENV(): Mode {
    return this.configService.get<Mode>('App.NODE_ENV');
  }
}
