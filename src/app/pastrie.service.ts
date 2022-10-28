import { Injectable } from '@angular/core';
import { Pastries, Ingredients_list } from './pastries';
import { INGREDIENTS_LISTS, PASTRIES } from './mock-pastries';

@Injectable({
  providedIn: 'root'
})
export class PastrieService {

  pastries = PASTRIES

  constructor() { }

  getPastries(): Pastries[] {
    return this.pastries.sort((a, b) => a.quantity - b.quantity).reverse();
  }

  getPastrie(id: string): Pastries | undefined {
    return this.pastries.find(pastry => pastry.id === id);
  }

  getPastrieIngredientsList(id: string): Ingredients_list | undefined {
    return INGREDIENTS_LISTS.find(item => item.id === id);
  }

  count() {
    let pastriesTypes: string[] = [];
    for (let pastry of this.pastries) {
      if (!pastriesTypes.includes(pastry.ref)) {
        pastriesTypes.push(pastry.ref);
      }
    }

    return pastriesTypes.length;
  }

  paginate(start: number, end: number): Pastries[] {
    console.log(this.pastries.length);
    const page = this.pastries.sort((a, b) => a.quantity - b.quantity).reverse().slice(start, end);
    return page;
  }

  search(word: string) {
    return this.pastries.filter(pastry => pastry.name.includes(word));
  }
}
