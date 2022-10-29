import { Component, OnInit } from '@angular/core';
import { Pastries } from '../pastries';
import { PASTRIES } from '../mock-pastries';
import { PastrieService } from '../pastrie.service';
import { ThisReceiver } from '@angular/compiler';

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
  nbrOfPages: number = Number((this.totalNbrofPastries / this.nbrOfItem).toFixed(0))
  pageList = [...Array(this.nbrOfPages).keys()];
  currentPage: number = 0;
  searchInput: string = "";
  searchedPastriesList: Pastries[] = [];

  constructor(private pastrieService: PastrieService) { }

  /*console(item: any) {
    console.log(item);
  }*/

  ngOnInit(): void {
    let count = this.pastrieService.count();
    this.pastries = this.pastrieService.paginate(0, this.nbrOfItem);
  }

  onSelect(pastrie: Pastries): void {
    this.selectedPastrie = pastrie;
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
    console.log(pastries);

    console.log(pastries.length);
    this.totalNbrofPastries = pastries.length;
    this.nbrOfPages = Number((this.totalNbrofPastries / this.nbrOfItem).toFixed(0));
    this.pageList = [...Array(this.nbrOfPages).keys()];
    //console.log(this.totalNbrofPastries);
    //console.log(this.nbrOfPages);
    this.pastries = this.searchedPastriesList = pastries;
    this.pastries = pastries.slice(0, this.nbrOfItem);
    //this.pastries.slice(0, this.nbrOfItem);
    this.currentPage = 0;
    console.log(this.searchedPastriesList);
  }

  getWordInput(word: string) {
    this.searchInput = word;
    console.log(this.searchInput)
  }

  switchPage(prev: HTMLButtonElement, next: HTMLButtonElement, e: MouseEvent) {
    console.log(prev);
    console.log(this.searchedPastriesList);
    if (this.pageStart > 0 && prev === e.target) {
      this.searchInput !== "" ? this.pastries = this.searchedPastriesList.slice((this.pageStart -= this.nbrOfItem), (this.pageEnd -= this.nbrOfItem)) : this.pastries = this.pastrieService.paginate((this.pageStart -= this.nbrOfItem), (this.pageEnd -= this.nbrOfItem));
      prev.disabled = next.disabled = false;
      if (this.currentPage !== undefined) {
        this.currentPage -= 1;
      }

      if (this.pageStart <= 0) {
        prev.disabled = true;
      }
    }
    else if (this.pageEnd < this.pastrieService.getPastries().length && next === e.target) {
      this.searchInput !== "" ? this.pastries = this.searchedPastriesList.slice((this.pageStart += this.nbrOfItem), (this.pageEnd += this.nbrOfItem)) : this.pastries = this.pastrieService.paginate((this.pageStart += this.nbrOfItem), (this.pageEnd += this.nbrOfItem));
      next.disabled = prev.disabled = false;
      if (this.currentPage !== undefined) {
        this.currentPage += 1;
      }

      if (this.pageEnd >= this.pastrieService.getPastries().length) {
        next.disabled = true;
      }
    }

    console.log(`Start: ${this.pageStart}    End: ${this.pageEnd}`);
  }

  pagination(page: number) {
    this.searchInput !== "" ? this.pastries = this.searchedPastriesList.slice(this.pageStart = this.nbrOfItem * page, this.pageEnd = (this.nbrOfItem * page) + this.nbrOfItem) : this.pastries = this.pastrieService.paginate(this.pageStart = this.nbrOfItem * page, this.pageEnd = (this.nbrOfItem * page) + this.nbrOfItem);
    this.currentPage = page;
    console.log(`Start: ${this.pageStart}    End: ${this.pageEnd}`);
  }

}
