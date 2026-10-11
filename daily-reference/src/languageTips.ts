export type LanguageTip = {
  korean: string;
  english: string;
  englishPronunciation: string;
  japanese: string;
  japanesePronunciation: string;
  words: Array<{ korean: string; english: string; englishPronunciation: string; japanese: string; japanesePronunciation: string }>;
};

export const languageTips: LanguageTip[] = [
  {
    korean: "오늘은 창문을 열고 환기해요.",
    english: "I open the window to let fresh air in today.",
    englishPronunciation: "아이 오픈 더 윈도우 투 렛 프레시 에어 인 투데이",
    japanese: "今日は窓を開けて換気します。",
    japanesePronunciation: "쿄오와 마도오 아케테 칸키시마스",
    words: [
      { korean: "창문", english: "window", englishPronunciation: "윈도우", japanese: "窓", japanesePronunciation: "마도" },
      { korean: "환기하다", english: "ventilate", englishPronunciation: "벤틸레이트", japanese: "換気する", japanesePronunciation: "칸키스루" },
      { korean: "신선한 공기", english: "fresh air", englishPronunciation: "프레시 에어", japanese: "新鮮な空気", japanesePronunciation: "신센나 쿠우키" },
    ],
  },
  {
    korean: "사용한 수건을 완전히 말려요.",
    english: "I dry the used towel completely.",
    englishPronunciation: "아이 드라이 더 유즈드 타월 컴플리틀리",
    japanese: "使ったタオルをしっかり乾かします。",
    japanesePronunciation: "츠캇타 타오루오 싯카리 카와카시마스",
    words: [
      { korean: "사용하다", english: "use", englishPronunciation: "유즈", japanese: "使う", japanesePronunciation: "츠카우" },
      { korean: "수건", english: "towel", englishPronunciation: "타월", japanese: "タオル", japanesePronunciation: "타오루" },
      { korean: "말리다", english: "dry", englishPronunciation: "드라이", japanese: "乾かす", japanesePronunciation: "카와카스" },
    ],
  },
  {
    korean: "냉장고에 남은 음식을 먼저 먹어요.",
    english: "I eat the leftover food in the refrigerator first.",
    englishPronunciation: "아이 잇 더 레프트오버 푸드 인 더 리프리저레이터 퍼스트",
    japanese: "冷蔵庫に残った料理を先に食べます。",
    japanesePronunciation: "레이조오코니 노콧타 료오리오 사키니 타베마스",
    words: [
      { korean: "냉장고", english: "refrigerator", englishPronunciation: "리프리저레이터", japanese: "冷蔵庫", japanesePronunciation: "레이조오코" },
      { korean: "남은 음식", english: "leftover food", englishPronunciation: "레프트오버 푸드", japanese: "残り物", japanesePronunciation: "노코리모노" },
      { korean: "먼저", english: "first", englishPronunciation: "퍼스트", japanese: "先に", japanesePronunciation: "사키니" },
    ],
  },
  {
    korean: "외출하기 전에 우산을 확인해요.",
    english: "I check my umbrella before going out.",
    englishPronunciation: "아이 체크 마이 엄브렐러 비포 고잉 아웃",
    japanese: "出かける前に傘を確認します。",
    japanesePronunciation: "데카케루 마에니 카사오 카쿠닌시마스",
    words: [
      { korean: "외출하다", english: "go out", englishPronunciation: "고 아웃", japanese: "出かける", japanesePronunciation: "데카케루" },
      { korean: "우산", english: "umbrella", englishPronunciation: "엄브렐러", japanese: "傘", japanesePronunciation: "카사" },
      { korean: "확인하다", english: "check", englishPronunciation: "체크", japanese: "確認する", japanesePronunciation: "카쿠닌스루" },
    ],
  },
  {
    korean: "오늘 입을 옷을 미리 골라요.",
    english: "I choose tomorrow's outfit in advance.",
    englishPronunciation: "아이 추즈 투모로우즈 아웃핏 인 어드밴스",
    japanese: "明日着る服を前もって選びます。",
    japanesePronunciation: "아시타 키루 후쿠오 마에못테 에라비마스",
    words: [
      { korean: "입다", english: "wear", englishPronunciation: "웨어", japanese: "着る", japanesePronunciation: "키루" },
      { korean: "옷", english: "clothes", englishPronunciation: "클로즈", japanese: "服", japanesePronunciation: "후쿠" },
      { korean: "미리", english: "in advance", englishPronunciation: "인 어드밴스", japanese: "前もって", japanesePronunciation: "마에못테" },
    ],
  },
  {
    korean: "욕실의 물기를 닦아내요.",
    english: "I wipe away the water in the bathroom.",
    englishPronunciation: "아이 와이프 어웨이 더 워터 인 더 배스룸",
    japanese: "浴室の水気を拭き取ります。",
    japanesePronunciation: "요쿠시츠노 미즈케오 후키토리마스",
    words: [
      { korean: "욕실", english: "bathroom", englishPronunciation: "배스룸", japanese: "浴室", japanesePronunciation: "요쿠시츠" },
      { korean: "물기", english: "moisture", englishPronunciation: "모이스처", japanese: "水気", japanesePronunciation: "미즈케" },
      { korean: "닦아내다", english: "wipe away", englishPronunciation: "와이프 어웨이", japanese: "拭き取る", japanesePronunciation: "후키토루" },
    ],
  },
  {
    korean: "필요한 것만 장바구니에 담아요.",
    english: "I put only what I need in the shopping cart.",
    englishPronunciation: "아이 풋 온리 왓 아이 니드 인 더 쇼핑 카트",
    japanese: "必要なものだけを買い物かごに入れます。",
    japanesePronunciation: "히츠요오나 모노다케오 카이모노카고니 이레마스",
    words: [
      { korean: "필요하다", english: "need", englishPronunciation: "니드", japanese: "必要だ", japanesePronunciation: "히츠요오다" },
      { korean: "장바구니", english: "shopping cart", englishPronunciation: "쇼핑 카트", japanese: "買い物かご", japanesePronunciation: "카이모노카고" },
      { korean: "필요한 것만", english: "only what I need", englishPronunciation: "온리 왓 아이 니드", japanese: "必要なものだけ", japanesePronunciation: "히츠요오나 모노다케" },
    ],
  },
];
