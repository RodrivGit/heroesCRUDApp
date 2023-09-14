import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('') //Autocomplete input
  public heroes: Hero[] = []; //list where heroes are stored.
  public selectedHero?: Hero; //heroe that has been selected.
  constructor(private heroService: HeroesService) { }

  searchHero() {
    const value: string = this.searchInput.value || '';
    console.log({ value })

    this.heroService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes)

  }
  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
     return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero)
    this.selectedHero = hero;
  }
}