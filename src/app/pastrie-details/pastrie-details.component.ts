import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Pastries, Ingredients_list, BtnState, Priority } from '../pastries';
import { INGREDIENTS_LISTS } from '../mock-pastries';
import { PastrieService } from '../pastrie.service';

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrls: ['./pastrie-details.component.scss']
})

export class PastrieDetailsComponent implements OnInit {

  @Input() pastries: Pastries | null = null;
  @Output() changePreference: EventEmitter<string> = new EventEmitter();
  @Output() currentPastries: EventEmitter<Pastries | null> = new EventEmitter();
  ingredients?: Ingredients_list = undefined;

  state: BtnState = BtnState.Desc

  tag: string = ""
  choice: number = 0
  max_preferences: boolean = false

  constructor(private pastrieService: PastrieService) {
    
  }

  ngOnInit(): void {
    
  }

  /*onChange(pastries: Pastries) {
    if (pastries !== null) {
      this.ingredients = INGREDIENTS_LISTS.find(item => item.id === pastries?.id);
    }
    console.log(this.ingredients);
  }*/

  ngOnChanges() {
    if (this.pastries !== null) {
      this.ingredients = this.ingredients = this.pastrieService.getPastrieIngredientsList(this.pastries.id);
    }
    this.ingredients?.list.sort()
    console.log(this.ingredients);
  }

  modifyIngredientsOrder() {
    this.state === BtnState.Asc ? this.state = BtnState.Desc : this.state = BtnState.Asc;
    this.ingredients?.list.reverse();
  }

  preference(id: string) {
    this.changePreference.emit(id);
    console.log(this.changePreference);
    this.tag = Priority.Clicked
    this.choice += 1;
    if (this.choice >= 3) {
      this.max_preferences = true;
    }
  }

  hideDetails(pastry: Pastries | null) {
    console.log('Before: ', pastry);  
    pastry = null;
    this.choice -= 1;
    this.currentPastries.emit(pastry);
    console.log('After: ', pastry);
    
  }

}
