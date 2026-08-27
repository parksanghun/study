import { StockPrice } from "./observer.js";

const stock = new StockPrice("TOY", 100);
const auditLog = [];

const unsubscribeAudit = stock.subscribe((event) => {
  auditLog.push(`${event.symbol}: ${event.previousPrice} -> ${event.price}`);
});

stock.subscribe((event) => {
  console.log(`알림: ${event.symbol} 가격이 ${event.price}로 변경됨`);
});

stock.updatePrice(120);
console.log("관찰자 수:", stock.observerCount);
unsubscribeAudit();
stock.updatePrice(130);
console.log("감사 로그:", auditLog);
