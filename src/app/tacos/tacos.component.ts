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

  meatQuantity!: string;
  sauceQuantity!: string;
  supplementQuantity!: string;

  tacosIndex: number = 0;
  tacosList: Tacos[] = [];

  constructor(private _elRef: ElementRef) { }

  ngOnInit(): void {
    this.meatQuantity = "2";
    this.sauceQuantity = "2";
    this.supplementQuantity = "1";
  }

  onGenerate(): void {
    if (this.isQuantityValid()) {
      let tacos = this.getRandomTacos();

      this.tacosList.splice(tacos.id, 0, tacos);
      this.tacosIndex++;
    } else {
      this.displayQuantityError();
    }
  }

  getRandomTacos(): Tacos {
    let tacos: Tacos = {
      'id': this.tacosIndex,
      'eater': this.getEater(),
      'meats': this.getRandomMeats(+this.meatQuantity),
      'sauces': this.getRandomSauces(+this.sauceQuantity),
      'supplements': this.getRandomSupplements(+this.supplementQuantity)
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
        if (!meats.includes(meat) && meat.enabled) {
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
      if (!sauces.includes(sauce) && sauce.enabled) {
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
      if (!supplements.includes(supplement) && supplement.enabled) {
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

    this.resetAllTacosId();
  }

  resetAllTacosId() {
    this.tacosIndex = 0;

    this.tacosList.forEach((tacos) => {
      tacos.id = this.tacosIndex;
      this.tacosIndex++;
    })
  }

  enableIngredient(list: string, id: number) {
    switch (list) {
      case "meats":
        this.meats[id].enabled = (this.meats[id].enabled ? false : true);
        break;
    
      case "sauces":
        this.sauces[id].enabled = (this.sauces[id].enabled ? false : true);
        break;

      case "supplements":
        this.supplements[id].enabled = (this.supplements[id].enabled ? false : true);
        break;
    }
  }

  isQuantityValid(): boolean {
    if (+this.meatQuantity > this.meats.filter(meat => meat.enabled).length)
      return false;

    if (+this.sauceQuantity > this.sauces.filter(sauce => sauce.enabled).length)
      return false;

    if (+this.supplementQuantity > this.supplements.filter(supplement => supplement.enabled).length)
      return false;
    
    return true;
  }

  displayQuantityError(): void {
    window.alert("Le nombre d'ingrédient dans votre tacos doit être inférieur ou égal au nombre d'ingrédients activés dans la liste.");
  }
}
