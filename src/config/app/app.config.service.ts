import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TimeBuilder from '../../app/share/builders/time.builder';

type Mode = 'DEV' | 'PROD';
@Injectable()
export default class AppConfigService {
  constructor(private configService: ConfigService) {}

  get PORT(): number {
    return +this.configService.get('App.PORT');
  }

  get NODE_ENV(): Mode {
    return this.configService.get<Mode>('App.NODE_ENV');
  }

  get TOKEN_EXPIRE(): number {
    const tokenExpirationDays = +this.configService.get('App.TOKEN_EXPIRE');
    const timeBuilder = new TimeBuilder();
    return timeBuilder.time(tokenExpirationDays).in('day').getMillisecond();
  }
}
