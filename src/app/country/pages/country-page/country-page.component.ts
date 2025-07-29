import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { countryService } from '../../services/country.service';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent { 

  fb = inject(FormBuilder)
  countryHttp = inject(countryService)


  regions= signal(this.countryHttp.regions)

  countriesRegion = signal<Country[]>([])
  countriesBorders = signal<Country[]>([])


  myForm= this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],        

  })


  onFormChanged = effect( (onCleanup) => {
    const regionSubscription = this.onRegionChanged()
    const countrySubscription = this.onCountryChanged()

    onCleanup( ()=>{
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe()
      console.log('cleannn');
    
    })
  })

  onRegionChanged(){

    return this.myForm
      .get('region')!.valueChanges // signo de adm porque siempre va a tener un valor
      .pipe(
        // tap( (region) => console.log({region}))
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.myForm.get('border')!.setValue('') ),
        tap( () => {
          this.countriesRegion.set([])
          this.countriesBorders.set([])
        } ),
        switchMap( region => this.countryHttp.getCountriesByRegion(region ?? ''))
      )
      .subscribe( (countries) =>{
        console.log(countries);
        this.countriesRegion.set(countries)
        
      } )

  }
  


  onCountryChanged(){
     return this.myForm
      .get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('border')!.setValue('')),
        filter( (value) => value!.length > 0 ), 
        switchMap( (alphaCode) => this.countryHttp.getCountryByAlphaCode( alphaCode ?? '') ),
        switchMap(country => this.countryHttp.getCountryNamesByCode(country.borders))
      )
      .subscribe((borders) => {
        console.log({ borders });
        this.countriesBorders.set(borders)
      })
  }



}
