import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { serializeError } from 'serialize-error';
import { AppearanceColor } from '../models';


@Injectable({ providedIn: 'root' })
export class AppErrorHandler extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
   }

  override handleError(error: Error | HttpErrorResponse) {

    
    let message: string;

    if (error instanceof HttpErrorResponse) {
      message = error.message;
    } else {
     // message = serializeError(error).message as string;
    }

    
    super.handleError(error);

  }

}
