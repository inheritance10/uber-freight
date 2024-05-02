import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class SqlExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      response.status(400).json({ message: error.code });
    } else {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
