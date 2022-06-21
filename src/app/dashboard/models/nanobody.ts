import { Binding } from './binding';
import { Origin } from './origin';
import { Reference } from './reference';
import { Tm } from './tm';
import { Yield } from './yield';
import { Sequence } from './sequence';
import { Structure } from './structure';

export interface Nanobody {
  id: string;
  binding: Binding;
  name: string;
  origin: Origin;
  reference: Reference;
  sequence: Sequence;
  tm: Tm;
  yield: Yield;
  isOpen?: boolean;
  structure: Structure;
}
