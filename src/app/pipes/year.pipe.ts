import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  standalone: true
})
export class YearPipe implements PipeTransform {

  transform(date: Date, ...args: unknown[]): number {
    return date.getFullYear();
  }

}
