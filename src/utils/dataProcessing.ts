import rawData from "../data/india-agro-dataset.json";

type CropData = {
  Country: string;
  Year: string;
  CropName: string;
  CropProduction: number;
  YieldOfCrops: number;
  AreaUnderCultivation: number;
};

const parseData = (data: any[]): CropData[] => {
  return data.map((item) => ({
    Country: item.Country,
    Year: item.Year.split(",")[1].trim(),
    CropName: item["Crop Name"],
    CropProduction: parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0,
    YieldOfCrops:
      parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
    AreaUnderCultivation:
      parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
  }));
};

const cropData = parseData(rawData);

const getYearlyAggregations = (
  data: CropData[]
): Record<string, { maxCrop: string; minCrop: string }> => {
  const yearlyData: Record<
    string,
    {
      maxCrop: string;
      minCrop: string;
      maxProduction: number;
      minProduction: number;
    }
  > = {};

  data.forEach((item) => {
    const { Year, CropName, CropProduction } = item;

    if (!yearlyData[Year]) {
      yearlyData[Year] = {
        maxCrop: CropName,
        minCrop: CropName,
        maxProduction: CropProduction,
        minProduction: CropProduction,
      };
    } else {
      const currentYearData = yearlyData[Year];
      if (CropProduction > currentYearData.maxProduction) {
        currentYearData.maxProduction = CropProduction;
        currentYearData.maxCrop = CropName;
      }
      if (CropProduction < currentYearData.minProduction) {
        currentYearData.minProduction = CropProduction;
        currentYearData.minCrop = CropName;
      }
    }
  });

  return Object.keys(yearlyData).reduce((acc, year) => {
    const { maxCrop, minCrop } = yearlyData[year];
    acc[year] = { maxCrop, minCrop };
    return acc;
  }, {} as Record<string, { maxCrop: string; minCrop: string }>);
};

const getCropAggregations = (data: CropData[]) => {
  const cropTotals: Record<
    string,
    { totalYield: number; totalArea: number; count: number }
  > = {};

  data.forEach((item) => {
    const { CropName, YieldOfCrops, AreaUnderCultivation } = item;
    if (!cropTotals[CropName]) {
      cropTotals[CropName] = { totalYield: 0, totalArea: 0, count: 0 };
    }
    cropTotals[CropName].totalYield += YieldOfCrops;
    cropTotals[CropName].totalArea += AreaUnderCultivation;
    cropTotals[CropName].count += 1;
  });

  return Object.keys(cropTotals).map((crop) => {
    const { totalYield, totalArea, count } = cropTotals[crop];
    return {
      Crop: crop,
      AvgYield: (totalYield / count).toFixed(3),
      AvgArea: (totalArea / count).toFixed(3),
    };
  });
};

const yearlyAggregations = getYearlyAggregations(cropData);
const cropAggregations = getCropAggregations(cropData);

export { yearlyAggregations, cropAggregations };
