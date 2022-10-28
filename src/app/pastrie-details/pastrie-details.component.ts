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
  }

  modifyIngredientsOrder() {
    this.state === BtnState.Asc ? this.state = BtnState.Desc : this.state = BtnState.Asc;
    this.ingredients?.list.reverse();
  }

  preference(id: string) {
    /* Update the number of choice only if the pastry has not been choosen yet */
    if (!this.pastries?.priority) {
      this.choice += 1;
    }
    this.changePreference.emit(id);
    this.tag = Priority.Clicked

    this.choice >= 3 ? this.max_preferences = true : this.max_preferences = false;
  }

  hideDetails(pastry: Pastries | null) { 
    /* Update the number of choice only if the pastry has been choosen once */
    if (this.pastries?.priority) {
      this.choice -= 1;
    }

    /* Empty pastry to hide the details view */
    pastry = null;
    this.currentPastries.emit(pastry);
    
    this.choice >= 3 ? this.max_preferences = true : this.max_preferences = false;
  }

}
