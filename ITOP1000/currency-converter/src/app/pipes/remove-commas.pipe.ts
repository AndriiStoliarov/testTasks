import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeCommas',
  standalone: false
})
export class RemoveCommasPipe implements PipeTransform {

  isNotComma(charecter: string): boolean {
    return charecter !== ','
  }

  transform(value: string | null): string {
    return [...value!].filter(this.isNotComma).join("");
  }

}
