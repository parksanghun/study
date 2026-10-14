import {describe,expect,it} from "vitest";
import {getAnimalIndex,getFortuneSymbols,getZodiacIndex} from "./fortune";

describe("fortune date classification",()=>{
  it("classifies 1984-09-21 as Virgo",()=>expect(getZodiacIndex(9,21)).toBe(5));
  it("classifies zodiac boundary dates",()=>{
    expect(getZodiacIndex(3,21)).toBe(0);
    expect(getZodiacIndex(9,22)).toBe(5);
    expect(getZodiacIndex(9,23)).toBe(6);
  });
  it("uses lunar new year for animal signs",()=>{
    expect(getAnimalIndex(1984,1,31)).toBe(11);
    expect(getAnimalIndex(1984,2,2)).toBe(0);
    expect(getAnimalIndex(1984,9,21)).toBe(0);
  });
  it("returns both symbols for the reported birth date",()=>expect(getFortuneSymbols("1984-09-21")).toEqual({zodiacIndex:5,animalIndex:0}));
});
