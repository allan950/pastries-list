import { Component, OnInit } from '@angular/core';
import { Pastries } from '../pastries';
import { PASTRIES } from '../mock-pastries';
import { PastrieService } from '../pastrie.service';

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrls: ['./pastries.component.scss']
})
export class PastriesComponent implements OnInit {
  titlePage: string = 'Page principle: Liste des patisserie';
  selectedPastrie: Pastries | null = null
  pastries: Pastries[] = [];
  totalNbrofPastries: number = this.pastrieService.getPastries().length
  nbrOfItem: number = 2;
  pageStart: number = 0;
  pageEnd: number = this.nbrOfItem;
  nbrOfPages: number = Number((this.totalNbrofPastries/this.nbrOfItem).toFixed(0))
  pageList = [...Array(this.nbrOfPages).keys()];

  constructor(private pastrieService: PastrieService) { }

  console(item: any) {
    console.log(item);
    //[ngClass]="{'disabled': this.getElementId('previous').disabled}"
  }

  ngOnInit(): void {
    //this.pastries = this.pastrieService.getPastries();
    let count = this.pastrieService.count();
    console.log(count);
    //console.log(this.pastrieService.paginate(0, 3))
    this.pastries = this.pastrieService.paginate(0, this.nbrOfItem);
    console.log(this.pageList);
    console.log(`Number of Items: ${this.totalNbrofPastries}
    Number of Pages: ${[...Array((this.totalNbrofPastries/this.nbrOfItem).toFixed(0)).keys()]}
    getActualPageNbr: ${(this.totalNbrofPastries/this.nbrOfItem).toFixed(0)}`)
  }

  onSelect(pastrie: Pastries): void {
    this.selectedPastrie = pastrie;
    console.log('pastries: ', pastrie);
    console.log('selectedPastrie: ', this.selectedPastrie);
  }

  changeParentPreference(property: string) {
    console.log(property)
    //let pastry = this.pastries.find(pastry => pastry.id === property);
    if (this.selectedPastrie) {
      this.selectedPastrie.priority = true;
    }
  }

  updatePastrie(pastries: Pastries | null) {
    if (pastries === null && this.selectedPastrie) {
      this.selectedPastrie.priority = false;
    }
    this.selectedPastrie = pastries;
    console.log('pastries ', pastries);
    console.log('this.selectedPastrie ', this.selectedPastrie);
  }

  getResult(pastries: Pastries[]) {
    this.pastries = pastries;
  }

  switchPage(prev: HTMLButtonElement, next: HTMLButtonElement, e: MouseEvent) {
    console.log(prev);
    if (this.pageStart > 0 && prev === e.target) {
      this.pastries = this.pastrieService.paginate((this.pageStart -= this.nbrOfItem), (this.pageEnd -= this.nbrOfItem));
      prev.disabled = next.disabled = false;
      if (this.pageStart <= 0) {
        prev.disabled = true;
      }
    }
    else if (this.pageEnd < this.pastrieService.getPastries().length && next === e.target) {
      this.pastries = this.pastrieService.paginate((this.pageStart += this.nbrOfItem), (this.pageEnd += this.nbrOfItem));
      next.disabled = prev.disabled = false;
      if (this.pageEnd >= this.pastrieService.getPastries().length) {
        next.disabled = true;
      }
    }

    /*if (this.pageStart >= 0 && this.pageEnd < this.pastrieService.getPastries().length) {
      if (elmt.id === "previous") {
        this.pastries = this.pastrieService.paginate((this.pageStart -= this.nbrOfItem), (this.pageEnd -= this.nbrOfItem));
      } else if (elmt.id === "next") {
        this.pastries = this.pastrieService.paginate((this.pageStart += this.nbrOfItem), (this.pageEnd += this.nbrOfItem));
      }
    }*/

    /*if (this.pageStart >= 0 && this.pageEnd <= this.pastrieService.getPastries().length) {
      if (elmt.id === "previous") {
        this.pastries = this.pastrieService.paginate((this.pageStart -= this.nbrOfItem), (this.pageEnd -= this.nbrOfItem));
      } else if (elmt.id === "next") {
        this.pastries = this.pastrieService.paginate((this.pageStart += this.nbrOfItem), (this.pageEnd += this.nbrOfItem));
      }

      if (this.pageEnd === this.pastrieService.getPastries().length) {
        console.log('Next btn disabled');
        elmt.disabled = true;
      } else {
        console.log('Next btn enabled');
        if (elmt.id === "next") {
          elmt.disabled = false;
        }
      }
    }*/

    console.log(`nbrOfItem ${this.nbrOfItem}`);
    console.log(`Page Start: ${this.pageStart} && Page End: ${this.pageEnd}`);
  }

}
