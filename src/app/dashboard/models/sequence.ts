import { cdr } from './cdr';

export interface Sequence {
  raw: string;
  aho: string;
  frameworks: string[];
  cdrs: cdr[];
}
