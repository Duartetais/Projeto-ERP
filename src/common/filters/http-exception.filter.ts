import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx    = host.switchToHttp();
    const res    = ctx.getResponse<Response>();
    const req    = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const body   = exception.getResponse();

    res.status(status).json({
      statusCode: status,
      message: typeof body === 'object' && 'message' in (body as object)
        ? (body as any).message
        : exception.message,
      error: HttpStatus[status] ?? 'Error',
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}