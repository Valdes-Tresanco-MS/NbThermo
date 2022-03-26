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
        'DSF (SYPRO)': { values: dsf },
        'Circular dichroism': { value: circularDichroism },
        'Refolding (%)': { value: refolding },
        DSC: { value: dsc },
      },
      Binding,
      'Yield (mg/L)': {
        Periplasm: { value: periplasm },
        Cytoplasm: { value: cytoplasm },
      },
      Origin: {
        Source: { value: source },
        Type: { value: type },
        'Obtaining method': { value: method },
      },
      Sequence: { raw: sequence },
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
      tm: { nanoDSF, dsc, dsf, circularDichroism, refolding },
      binding: { antigens },
      yield: { periplasm, cytoplasm },
      origin: { source, type, method },
      sequence,
    } as Nanobody;
  });
  return { data } as Database;
};

export { mapData };
