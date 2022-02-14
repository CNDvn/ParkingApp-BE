import { BadRequestException } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
interface Query {
  query: { sizePage: number | string; currentPage: number | string };
}
type RequestExtend = Request & Query;
@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(req: RequestExtend, res: Response, next: NextFunction): void {
    const currentPage: string = (req.query.currentPage as string)
      ? (req.query.currentPage as string)
      : '1';
    const sizePage: string = (req.query.sizePage as string)
      ? (req.query.sizePage as string)
      : '5';
    if (!currentPage.match(/^[0-9]+$/)) {
      throw new BadRequestException(`${req.query.currentPage} must be number`);
    }
    if (!sizePage.match(/^[0-9]+$/)) {
      throw new BadRequestException(`${req.query.sizePage} must be number`);
    }
    req.query.currentPage = +req.query.currentPage || 1;
    req.query.sizePage = +req.query.sizePage || 5;
    return next();
  }
}
