import { Condition } from 'src/types/condition.type';

export interface ListingDto {
  author: string;
  title: string;
  price: string;
  url: string;
  description: string;
  image: string;
  condition: Condition;
}
