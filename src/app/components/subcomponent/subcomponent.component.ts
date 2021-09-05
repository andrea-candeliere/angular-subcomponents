import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'subcomponent',
  templateUrl: './subcomponent.component.html',
  styleUrls: ['./subcomponent.component.scss']
})
export class SubcomponentComponent implements OnInit {
  @Output() selectedItem = new EventEmitter<string>();

  inputText = new FormControl();
  options: string[] = ['Angular', 'JQuery', 'Javascript'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.inputText.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.selectedItem.emit(filterValue)

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}