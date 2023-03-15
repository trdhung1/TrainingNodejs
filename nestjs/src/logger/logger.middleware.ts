import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Logger Middleware...');

    next();
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Logger middleware...`);
  next();
}
