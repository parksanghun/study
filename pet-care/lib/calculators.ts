export type PetKind = "dog" | "cat";
export function calculateDailyFoodGrams(weightKg:number,kind:PetKind,activity:"low"|"normal"|"high"){if(!Number.isFinite(weightKg)||weightKg<=0)return 0;const base=kind==="dog"?weightKg*22:weightKg*20;const multiplier=activity==="low"?.85:activity==="high"?1.2:1;return Math.round(base*multiplier)}
export function calculateMonthlyCost(input:Record<string,number>){return Object.values(input).reduce((total,value)=>total+(Number.isFinite(value)&&value>0?value:0),0)}
