import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    if (exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      message;
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
