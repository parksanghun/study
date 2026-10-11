import test from "node:test";import assert from "node:assert/strict";import {calculateDailyFoodGrams,calculateMonthlyCost} from "./calculators.ts";
test("calculates food by weight and activity",()=>{assert.equal(calculateDailyFoodGrams(10,"dog","normal"),220);assert.equal(calculateDailyFoodGrams(10,"dog","low"),187);assert.equal(calculateDailyFoodGrams(5,"cat","high"),120)});
test("ignores invalid costs",()=>{assert.equal(calculateMonthlyCost({food:30000,treats:-1,medical:NaN,supplies:15000}),45000)});
