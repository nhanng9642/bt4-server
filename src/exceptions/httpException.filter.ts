
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
    const {statusCode, message, timestamp} = exception;

    console.log(1, new Date().toISOString());

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

