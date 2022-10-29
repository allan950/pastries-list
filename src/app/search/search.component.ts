import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven
import { PastrieService } from '../pastrie.service';
import { Pastries } from '../pastries';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() result: EventEmitter<Pastries[]> = new EventEmitter();
  @Output() wordInput: EventEmitter<string> = new EventEmitter();
  word: string | undefined

  constructor(private pastrieService: PastrieService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form.value['word']);
    console.log(this.pastrieService.search(form.value['word']));
    this.result.emit(this.pastrieService.search(form.value['word']));
  }

  onChangeEmit(word: string) {
    console.log(word);
    this.result.emit(this.pastrieService.search(word));
    this.wordInput.emit(word);
  }

}
