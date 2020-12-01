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

  meatQuantity: number = 2;
  sauceQuantity: number = 2;
  supplementQuantity: number = 1;

  tacosIndex: number = 0;
  tacosList: Tacos[] = [];

  constructor(private _elRef: ElementRef) { }

  ngOnInit(): void {
  }

  onGenerate(): void {
    let tacos = this.getRandomTacos();

    this.tacosList.splice(tacos.id, 0, tacos);
    this.tacosIndex++;
  }

  getRandomTacos(): Tacos {
    let tacos: Tacos = {
      'id': this.tacosIndex,
      'eater': this.getEater(),
      'meats': this.getRandomMeats(this.meatQuantity),
      'sauces': this.getRandomSauces(this.sauceQuantity),
      'supplements': this.getRandomSupplements(this.supplementQuantity)
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

  getRandomMeats(max: number, isVege: boolean = false): Meat[] {
    let meats: Meat[] = [];
    let i: number = 0;

    if (max == 0 || isVege) {
      meats.push(this.meats[0]); 
    } else {
      while (i < max) {
        let meat: Meat = this.meats[Math.floor(Math.random() * this.meats.length)];
        if (!meats.includes(meat)) {
          meats.push(meat);
          i++;
        }
      }
    }

    return meats;
  }

  getRandomSauces(max: number): Sauce[] {
    let sauces: Sauce[] = [];
    let i: number = 0;

    while (i < max) {
      let sauce: Sauce = this.sauces[Math.floor(Math.random() * this.sauces.length)];
      if (!sauces.includes(sauce)) {
        sauces.push(sauce);
        i++;
      }
    }

    return sauces;
  }

  getRandomSupplements(max: number): Supplement[] {
    let supplements: Supplement[] = [];
    let i: number = 0;
    
    while (i < max) {
      let supplement: Supplement = this.supplements[Math.floor(Math.random() * this.supplements.length)];
      if (!supplements.includes(supplement)) {
        supplements.push(supplement);
        i++;
      }
    }

    return supplements;
  }

  onRegenerate(tacosId: number): void {
    let tacos = this.tacosList[tacosId];

    tacos.meats = this.getRandomMeats(tacos.meats.length, (tacos.meats[0].id == 0 && tacos.meats.length < 2 ? true : false));
    tacos.sauces = this.getRandomSauces(tacos.sauces.length);
    tacos.supplements = this.getRandomSupplements(tacos.supplements.length);

    this.tacosList.splice(tacosId, 1, tacos);  
  }

  onRemove(tacosId: number): void {
    this.tacosList.splice(tacosId, 1);

    this.tacosList.forEach( (tacos) => {
      if (tacos.id > tacosId) {
        tacos.id--;
        this.tacosIndex--;
      }
    })
  }
}
