import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'arrayNameFilter'
})
@Injectable({providedIn: 'root'})
export class ArrayNameFilterPipe implements PipeTransform {

  transform(array: any[], keyName: string, name: string ): any {
    if (array != null) {
    return array.filter(elem => elem[keyName].search(new RegExp(name, 'i')) !== -1);
    }
  }

}
