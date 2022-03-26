import { Binding } from './binding';
import { Origin } from './origin';
import { Reference } from './reference';
import { Tm } from './tm';
import { Yield } from './yield';

export interface Nanobody {
  id: String;
  binding: Binding;
  name: String;
  origin: Origin;
  reference: Reference;
  sequence: String;
  tm: Tm;
  yield: Yield;
}
