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
    // Init
    let i: number = 0;

    let meats: Meat[] = [];
    let sauces: Sauce[] = [];
    let supplements: Supplement[] = [];

    // Eater
    let eater = this._elRef.nativeElement.querySelector('#eater').value;
    if (eater == "") {
      eater = "Michel";
    }

    // Meat
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

    i = 0;
    
    // Sauce
    while (i < this.sauceQuantity) {
      let sauce: Sauce = this.sauces[Math.floor(Math.random() * this.sauces.length)];
      if (!sauces.includes(sauce)) {
        sauces.push(sauce);
        i++;
      }
    }

    i = 0;

    // Supplément
    while (i < this.supplementQuantity) {
      let supplement: Supplement = this.supplements[Math.floor(Math.random() * this.supplements.length)];
      if (!supplements.includes(supplement)) {
        supplements.push(supplement);
        i++;
      }
    }

    // Tacos
    let tacos: Tacos = {
      'id': this.tacosList.length,
      'eater': eater,
      'meats': meats,
      'sauces': sauces,
      'supplements': supplements
    };

    this.tacosList.push(tacos);

    console.log("Tacos généré !");
    
  }

  onRegenerate(tacosId: number): void {
    console.log("Regenerate");
     
  }

  onRemove(tacosId: number): void {
    console.log("Removing");
    
  }
}
