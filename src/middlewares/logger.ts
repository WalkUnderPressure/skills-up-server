import { Request, Response, NextFunction } from 'express';

import isObject from "../lib/isObject";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const tabSymbol = '\t';
  const doubleTabSymbol = '\t\t';

  const { method, url, headers, params, query, body } = req;
  const dataToPrint = { method, url, headers, params, query, body };

  const requestInfo = Object.entries(dataToPrint).map(([itemName, itemInfo]) => {
    let toPrint = JSON.stringify(itemInfo);

    if (isObject(itemInfo)) {
      toPrint = toPrint
        .split('","')
        .join(`\n${doubleTabSymbol}`)
        .replace(/{/gi, `\n${doubleTabSymbol}`)
        .replace(/}/gi, '');
    }

    return `${tabSymbol}${itemName}${tabSymbol}=> ${toPrint.replace(/"/gi, '')}`;
  }).join('\n');

  console.info(">>> Request info:\n", requestInfo);

  next();
}

export default loggerMiddleware;
