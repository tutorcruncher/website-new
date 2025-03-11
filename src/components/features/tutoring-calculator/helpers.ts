import { RegionData } from "./types";

export function removeZeroValuesFromRegionData(
  regionData: RegionData
): RegionData {
  const filteredQualLevels = { ...regionData.qual_levels };
  const filteredSubjects = { ...regionData.subjects };
  const filteredData = { ...regionData.data };

  for (const subjectKey of Object.keys(filteredData)) {
    const qualObject = filteredData[subjectKey];
    const newQualObject: typeof qualObject = {};

    for (const [qualKey, values] of Object.entries(qualObject)) {
      const { charge_rate, pay_rate } = values;
      if (!(charge_rate === 0 && pay_rate === 0)) {
        newQualObject[qualKey] = values;
      }
    }

    filteredData[subjectKey] = newQualObject;

    if (Object.keys(newQualObject).length === 0) {
      delete filteredData[subjectKey];
      delete filteredSubjects[subjectKey];
    }
  }

  for (const qualKey of Object.keys(filteredQualLevels)) {
    let foundNonZero = false;
    for (const subjectKey of Object.keys(filteredData)) {
      const subjectQuals = filteredData[subjectKey];
      if (subjectQuals[qualKey]) {
        foundNonZero = true;
        break;
      }
    }

    if (!foundNonZero) {
      delete filteredQualLevels[qualKey];
    }
  }

  return {
    qual_levels: filteredQualLevels,
    subjects: filteredSubjects,
    data: filteredData,
  };
}

const getMinMaxValues = (value) => {
  const min = (value * 0.875).toFixed(2);
  const max = (value * 1.125).toFixed(2);
  return { min, max };
};

function getCurrencyForRegion(region: string) {
  switch (region) {
    case "gb":
      return "£";
    case "au":
      return "A$";
    case "usa":
      return "$";
    case "global":
      return "$";
    default:
      return "$";
  }
}

export const getSubjectInfo = (region, subject) => {
  const symbol = getCurrencyForRegion(region);
  const { min: minCharge, max: maxCharge } = getMinMaxValues(
    subject.charge_rate
  );
  const { min: minPay, max: maxPay } = getMinMaxValues(subject.pay_rate);

  return {
    symbol,
    minCharge,
    maxCharge,
    minPay,
    maxPay,
  };
};
