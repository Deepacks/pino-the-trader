import { Condition } from 'src/types/condition.type';

export interface EmbedDto {
  author: string;
  title: string;
  url: string;
  description: string;
  image: string;
  condition: Condition;
}
