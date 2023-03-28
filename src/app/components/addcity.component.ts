import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit {

  form!: FormGroup
  countryName?: string;
  city?: string;
  imageUrl?: string;
  cityObj?: City;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private weatherSvc: WeatherService
  ) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      countryName: this.fb.control<string>('', [Validators.required]),
      city: this.fb.control<string>('', [Validators.required]),
      imageUrl: this.fb.control<string>('', [Validators.required])
    })
  }

  add() {
    const countryName = this.form?.value['countryName'];
    const city = this.form?.value['city'];
    const imageUrl = this.form?.value['imageUrl'];
    this.cityObj = { 
      country: countryName,
      city: city,
      imageUrl: imageUrl
    };
    this.weatherSvc.addCity(this.cityObj);
    this.router.navigate(['/']);
  }

}
