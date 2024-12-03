import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

const _isoDateFormat = /^\d{4}-\d{2}-\d{2}$/;

export const dateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(map( (val: HttpEvent<any>) => {
    if (val instanceof HttpResponse){
      const body = val.body;
      convert(body);
    }
    return val;
  }));  
};

function isIsoDateString(value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string'){
    return _isoDateFormat.test(value);
  }    
  return false;
}  
  
function convert(body: any) {
  if (body === null || body === undefined ) {
    return body;
  }
  if (typeof body !== 'object' ){
    return body;
  }
  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) {
      body[key] = new Date(value);
    } else if (typeof value === 'object') {
      convert(value);
    }
  }
}