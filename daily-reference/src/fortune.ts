import {Solar} from "lunar-javascript";

export const zodiacNames = ["양자리","황소자리","쌍둥이자리","게자리","사자자리","처녀자리","천칭자리","전갈자리","사수자리","염소자리","물병자리","물고기자리"];
export const animalNames = ["쥐","소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지"];

export function getZodiacIndex(month: number, day: number): number {
  const value = month * 100 + day;
  if (value >= 321 && value <= 419) return 0;
  if (value >= 420 && value <= 520) return 1;
  if (value >= 521 && value <= 621) return 2;
  if (value >= 622 && value <= 722) return 3;
  if (value >= 723 && value <= 822) return 4;
  if (value >= 823 && value <= 922) return 5;
  if (value >= 923 && value <= 1022) return 6;
  if (value >= 1023 && value <= 1122) return 7;
  if (value >= 1123 && value <= 1221) return 8;
  if (value >= 1222 || value <= 119) return 9;
  if (value >= 120 && value <= 218) return 10;
  return 11;
}

export function getAnimalIndex(year: number, month: number, day: number): number {
  const animal = Solar.fromYmd(year, month, day).getLunar().getYearShengXiao();
  const lunarAnimals = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
  const index = lunarAnimals.indexOf(animal);
  return index >= 0 ? index : ((year - 4) % 12 + 12) % 12;
}

export function getFortuneSymbols(date: string): {zodiacIndex: number; animalIndex: number} {
  const [year, month, day] = date.split("-").map(Number);
  return {zodiacIndex: getZodiacIndex(month, day), animalIndex: getAnimalIndex(year, month, day)};
}
