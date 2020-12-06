import { from } from 'rxjs';
import { Meat } from './meat';
import { Sauce } from './sauce';
import { Supplement } from './supplement';

export interface Tacos {
    id: number;
    eater: string;
    meats: Meat[];
    sauces: Sauce[];
    supplementsCheese: Supplement[];
    supplementsMeat: Supplement[];
    supplementsVegetal: Supplement[];
}