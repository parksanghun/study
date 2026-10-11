type Symbol = "◎" | "○" | "△" | "×";

const tops = [
  {name:"네이비", color:"#182b55"}, {name:"그린", color:"#357c4f"},
  {name:"옐로우", color:"#f1c51b"}, {name:"블루", color:"#0874d1"},
  {name:"베이지", color:"#e8dfca"}, {name:"레드", color:"#bc2739"},
];
const bottoms = [
  {name:"연청", color:"#8ecdd3"}, {name:"진청", color:"#203c79"},
  {name:"블랙진", color:"#282a2d"}, {name:"베이지", color:"#e8dfca"},
  {name:"크림진", color:"#f5f1e6"}, {name:"카키", color:"#3f633f"},
];
const matches: Symbol[][] = [
  ["◎","◎","△","○","○","◎"], ["×","○","◎","◎","○","△"],
  ["○","◎","◎","◎","◎","◎"], ["◎","○","○","×","×","○"],
  ["○","△","△","×","◎","◎"], ["○","×","○","×","○","×"],
];

function Outfit({top, bottom}:{top:string;bottom:string}){return <div className="outfit-icon"><span className="shirt" style={{backgroundColor:top}}/><span className="pants" style={{backgroundColor:bottom}}/></div>}

export default function App(){return <div className="tips-page"><header><div className="brand"><div className="brand-mark">◒</div><strong>생활팁</strong></div><nav className="main-menu"><a href="#color-match">옷 색상 매칭 가이드</a></nav></header><main id="color-match"><h1>상·하의 컬러 매치 꿀팁!</h1><div className="legend"><b>매칭 기준</b><span className="legend-best">◎ 매우 잘 어울림</span><span className="legend-okay">○ 적당히 어울림</span><span className="legend-maybe">△ 고민해보기</span><span className="legend-no">× 입지 말 것</span></div><div className="color-guide"><div className="guide-group"><b>상의</b>{tops.map(t=><span className="color-chip" key={t.name}><i style={{backgroundColor:t.color}}/>{t.name}</span>)}</div><div className="guide-group"><b>하의</b>{bottoms.map(t=><span className="color-chip" key={t.name}><i style={{backgroundColor:t.color}}/>{t.name}</span>)}</div></div><div className="table-scroll"><div className="match-chart"><div className="top-axis"><span>상의</span><i>→</i></div><div className="side-axis"><span>하의</span><i>↓</i></div><div className="column-labels">{tops.map(t=><span key={t.name}>{t.name}</span>)}</div><div className="rows">{bottoms.map((bottom,row)=><div className="match-row" key={bottom.name}><strong className="row-label"><i className="label-dot" style={{backgroundColor:bottom.color}}/>{bottom.name}</strong>{tops.map((top,col)=><div className={`match-cell match-${matches[row][col] === "◎" ? "best" : matches[row][col] === "×" ? "no" : matches[row][col] === "△" ? "maybe" : "okay"}`} key={top.name} title={`${top.name} 상의 + ${bottom.name} 하의`}><Outfit top={top.color} bottom={bottom.color}/><b className={`mark mark-${matches[row][col] === "◎" ? "best" : matches[row][col] === "×" ? "no" : matches[row][col] === "△" ? "maybe" : "okay"}`}>{matches[row][col]}</b></div>)}</div>)}</div></div></div></main><footer><strong>생활팁</strong></footer></div>}
