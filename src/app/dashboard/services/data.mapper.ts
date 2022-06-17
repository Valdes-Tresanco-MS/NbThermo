import { Database } from '../models/database';
import { Nanobody } from '../models/nanobody';

const mapData = (rawData: any[]) => {
  const data = rawData.map((i) => {
    const {
      id,
      Info: {
        Name: { value: name },
        Reference: { DOI: doi, Date: date },
      },
      Tm: {
        nanoDSF: { value: nanoDSF },
        'DSF (SYPRO)': { value: dsf },
        'Circular dichroism': { value: circularDichroism },
        'Refolding (%)': { value: refolding },
        DSC: { value: dsc },
        Other: { value: other },
      },
      Binding,
      'Yield (mg/L)': {
        Periplasm: { value: periplasm },
        Cytoplasm: { value: cytoplasm },
        Other: { value: otherYield },
      },
      Origin: {
        Source: { value: source },
        Type: { value: type },
        'Obtaining method': { value: method },
      },
      Sequence: {
        Raw: { value: raw },
        Aho: { value: aho },
        CDR1: { value: cdr1, Length: length1 },
        CDR2: { value: cdr2, Length: length2 },
        CDR3: { value: cdr3, Length: length3 },
        Framework1: { value: framework1 },
        Framework2: { Values: framework2 },
        Framework3: { value: framework3 },
        Framework4: { value: framework4 },
      },
      Structure: {
        PDB: { value: pdb },
        Model: { value: model },
        'Related PDB': { value: relatedPDB },
      },
    } = i;

    const antigens = [];
    for (const antigen in Binding) {
      const obj = Binding[antigen];
      if (!!obj.name && !!obj.type) {
        antigens.push(obj);
      }
    }

    return {
      id,
      name,
      reference: { doi, date },
      tm: { nanoDSF, dsc, dsf, circularDichroism, refolding, other },
      binding: { antigens },
      yield: { periplasm, cytoplasm, other: otherYield },
      origin: { source, type, method },
      sequence: {
        raw,
        aho: aho?.replace(/-/g, ''),
        frameworks: [
          framework1?.replace(/-/g, ''),
          framework2?.replace(/-/g, ''),
          framework3?.replace(/-/g, ''),
          framework4?.replace(/-/g, ''),
        ],
        cdrs: [
          { value: cdr1?.replace(/-/g, ''), length: length1 },
          { value: cdr2?.replace(/-/g, ''), length: length2 },
          { value: cdr3?.replace(/-/g, ''), length: length3 },
        ],
      },
      structure: { pdb, model, relatedPDB },
    } as Nanobody;
  });
  return { data } as Database;
};

export { mapData };
