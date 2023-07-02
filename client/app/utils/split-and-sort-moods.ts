import { DateTime as time } from "luxon";
import { MoodsQuery } from "../types/graphql";
import { SplitMoods } from "../types/mood";

export const splitAndSortMoodsByYearAndMonth = (moods: MoodsQuery["moods"]) => {
  const splitMoods = moods.reduce((total, currentMood) => {
    const year = time.fromISO(currentMood.date).year;
    const month = time.fromISO(currentMood.date).toLocaleString({ month: "long" });
    const order = parseInt(time.fromISO(currentMood.date).toLocaleString({ month: "numeric" }));

    console.log({ order });

    // TODO: simplify logic if possible
    const yearRowFound = total.find(yearRow => yearRow.name === year);
    if (yearRowFound) {
      const monthRowFound = yearRowFound.months.find(monthRow => monthRow.name === month);
      monthRowFound
        ? monthRowFound.moods.push(currentMood)
        : yearRowFound.months.push({ name: month, order, moods: [currentMood] });
    } else {
      total.push({ name: year, months: [{ name: month, order, moods: [currentMood] }] });
    }

    return total;
  }, [] as SplitMoods);
  return splitMoods.map(year => {
    year.months.sort((a, b) => (a.order > b.order ? -1 : a.order < b.order ? 1 : 0));
    year.months.map(month => {
      const sorted = month.moods.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
      return { month, moods: [...sorted] };
    });
    return year;
  });
};
