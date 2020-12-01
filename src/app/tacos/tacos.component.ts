// Angular Imports
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meat } from '../class/meat';
import { Sauce } from '../class/sauce';
import { Supplement } from '../class/supplement';

// Class import
import { Tacos } from './../class/tacos';

// Mock import
import { MEATS } from './../mocks/meat';
import { SAUCES } from './../mocks/sauce';
import { SUPPLEMENTS } from './../mocks/supplement';


@Component({
  selector: 'app-tacos',
  templateUrl: './tacos.component.html',
  styleUrls: ['./tacos.component.sass']
})
export class TacosComponent implements OnInit {

  meats = MEATS;
  sauces = SAUCES;
  supplements = SUPPLEMENTS;

  meatQuantity: number;
  sauceQuantity: number;
  supplementQuantity: number;

  tacosList: Tacos[] = [];

  constructor(private _elRef: ElementRef) { 
    this.meatQuantity = 2;
    this.sauceQuantity = 2;
    this.supplementQuantity = 1;
  }

  ngOnInit(): void {
  }

  onGenerate(): void {
    this.tacosList.push(this.getRandomTacos());
  }

  getRandomTacos(): Tacos {
    let tacos: Tacos = {
      'id': this.tacosList.length,
      'eater': this.getEater(),
      'meats': this.getRandomMeats(),
      'sauces': this.getRandomSauces(),
      'supplements': this.getRandomSupplements()
    };

    return tacos;
  }

  getEater(): string {
    let eater = this._elRef.nativeElement.querySelector('#eater').value;
    if (eater == "") {
      eater = "Michel";
    }

    return eater;
  }

  getRandomMeats(): Meat[] {
    let meats: Meat[] = [];
    let i: number = 0;

    if (this.meatQuantity == 0) {
      meats.push(this.meats[0]); 
    } else {
      while (i < this.meatQuantity) {
        let meat: Meat = this.meats[Math.floor(Math.random() * this.meats.length)];
        if (!meats.includes(meat)) {
          meats.push(meat);
          i++;
        }
      }
    }

    return meats;
  }

  getRandomSauces(): Sauce[] {
    let sauces: Sauce[] = [];
    let i: number = 0;

    while (i < this.sauceQuantity) {
      let sauce: Sauce = this.sauces[Math.floor(Math.random() * this.sauces.length)];
      if (!sauces.includes(sauce)) {
        sauces.push(sauce);
        i++;
      }
    }

    return sauces;
  }

  getRandomSupplements(): Supplement[] {
    let supplements: Supplement[] = [];
    let i: number = 0;
    
    while (i < this.supplementQuantity) {
      let supplement: Supplement = this.supplements[Math.floor(Math.random() * this.supplements.length)];
      if (!supplements.includes(supplement)) {
        supplements.push(supplement);
        i++;
      }
    }

    return supplements;
  }

  onRegenerate(tacosId: number): void {
    console.log("Regenerate");
     
  }

  onRemove(tacosId: number): void {
    console.log("Removing");
    
  }
}
