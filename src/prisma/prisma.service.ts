import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      super({
        log: [
          { emit: 'event', level: 'query' },
          { emit: 'stdout', level: 'info' },
          { emit: 'stdout', level: 'warn' },
          { emit: 'stdout', level: 'error' },
        ],
        errorFormat: 'colorless',
      });
      if (!(process.env.DEBUG === ""))
        this.enableQueryLogger();
    } else {
      super();
    }

  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableQueryLogger() {
    (this.$on as any)('query', (event: any) => {
      Logger.log(
        '\nQuery: ' +
          event.query +
          '\n**** Params: ' +
          event.params +
          '\n**** Duration: ' +
          event.duration +
          'ms',
      );
    });
  }
}