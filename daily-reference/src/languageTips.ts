export type LanguageTip = {
  korean: string;
  english: string;
  japanese: string;
  words: Array<{ korean: string; english: string; japanese: string }>;
};

export const languageTips: LanguageTip[] = [
  {
    korean: "오늘은 창문을 열고 환기해요.",
    english: "I open the window to let fresh air in today.",
    japanese: "今日は窓を開けて換気します。",
    words: [
      { korean: "창문", english: "window", japanese: "窓" },
      { korean: "환기하다", english: "ventilate", japanese: "換気する" },
      { korean: "신선한 공기", english: "fresh air", japanese: "新鮮な空気" },
    ],
  },
  {
    korean: "사용한 수건을 완전히 말려요.",
    english: "I dry the used towel completely.",
    japanese: "使ったタオルをしっかり乾かします。",
    words: [
      { korean: "사용하다", english: "use", japanese: "使う" },
      { korean: "수건", english: "towel", japanese: "タオル" },
      { korean: "말리다", english: "dry", japanese: "乾かす" },
    ],
  },
  {
    korean: "냉장고에 남은 음식을 먼저 먹어요.",
    english: "I eat the leftover food in the refrigerator first.",
    japanese: "冷蔵庫に残った料理を先に食べます。",
    words: [
      { korean: "냉장고", english: "refrigerator", japanese: "冷蔵庫" },
      { korean: "남은 음식", english: "leftover food", japanese: "残り物" },
      { korean: "먼저", english: "first", japanese: "先に" },
    ],
  },
  {
    korean: "외출하기 전에 우산을 확인해요.",
    english: "I check my umbrella before going out.",
    japanese: "出かける前に傘を確認します。",
    words: [
      { korean: "외출하다", english: "go out", japanese: "出かける" },
      { korean: "우산", english: "umbrella", japanese: "傘" },
      { korean: "확인하다", english: "check", japanese: "確認する" },
    ],
  },
  {
    korean: "오늘 입을 옷을 미리 골라요.",
    english: "I choose tomorrow's outfit in advance.",
    japanese: "明日着る服を前もって選びます。",
    words: [
      { korean: "입다", english: "wear", japanese: "着る" },
      { korean: "옷", english: "clothes", japanese: "服" },
      { korean: "미리", english: "in advance", japanese: "前もって" },
    ],
  },
  {
    korean: "욕실의 물기를 닦아내요.",
    english: "I wipe away the water in the bathroom.",
    japanese: "浴室の水気を拭き取ります。",
    words: [
      { korean: "욕실", english: "bathroom", japanese: "浴室" },
      { korean: "물기", english: "moisture", japanese: "水気" },
      { korean: "닦아내다", english: "wipe away", japanese: "拭き取る" },
    ],
  },
  {
    korean: "필요한 것만 장바구니에 담아요.",
    english: "I put only what I need in the shopping cart.",
    japanese: "必要なものだけを買い物かごに入れます。",
    words: [
      { korean: "필요하다", english: "need", japanese: "必要だ" },
      { korean: "장바구니", english: "shopping cart", japanese: "買い物かご" },
      { korean: "필요한 것만", english: "only what I need", japanese: "必要なものだけ" },
    ],
  },
];
