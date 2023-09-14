import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

public hero? : Hero;

  constructor( 
    private http:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){

  }
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      delay(1000),
      switchMap( ({id}) => this.http.getHeroById(id))
    ).subscribe(hero => {
      if(!hero) return this.router.navigate(['/heroes/list'])
      this.hero = hero;
    console.log({hero})
    return
    })
    }

    goBack():void{
      this.router.navigateByUrl('heroes/list')
    }

}
