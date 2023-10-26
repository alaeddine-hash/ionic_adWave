import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addAd'
})
export class AddAdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
