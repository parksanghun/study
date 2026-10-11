export type MatchSymbol = "◎" | "○" | "△" | "×";
export type ReferenceMatch = {symbol: MatchSymbol; label: string; note: string};
export const labels: Record<MatchSymbol, string> = {"◎":"매우 잘 어울림","○":"적당히 어울림","△":"고민해보기","×":"입지 말 것"};
const notes: Record<MatchSymbol, string> = {"◎":"이미지 기준으로 매우 잘 어울리는 조합입니다.","○":"이미지 기준으로 무난하게 어울리는 조합입니다.","△":"이미지 기준으로 신중하게 선택해보세요.","×":"이미지 기준으로 피하는 조합입니다."};
export const referenceScores: Record<string, MatchSymbol[]> = {
  연청:["◎","◎","△","○","○","◎"],
  진청:["×","○","◎","◎","○","△"],
  블랙진:["○","◎","◎","◎","◎","◎"],
  베이지:["◎","○","○","×","×","○"],
  크림진:["○","△","△","×","◎","◎"],
  카키:["○","×","○","×","○","×"]
};
export function getReferenceMatch(bottomName:string, topIndex:number):ReferenceMatch { const symbol=referenceScores[bottomName][topIndex]; return {symbol,label:labels[symbol],note:notes[symbol]}; }
