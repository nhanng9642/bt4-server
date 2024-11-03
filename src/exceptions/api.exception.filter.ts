
import { ExceptionFilter, Catch, 
    ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from './ApiError';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error(exception);

    const { message = 'Internal Server Error', statusCode = 500, timestamp = Date.now() } = exception;
    response
        .status(statusCode)
        .json({
            message,
            statusCode,
            timestamp,
            path: request.url,
        });
  }
}

