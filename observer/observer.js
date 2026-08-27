/**
 * Observer Pattern
 * Subject는 상태/이벤트를 관리하고, Observer는 변경 알림을 구독한다.
 */
export class Subject {
  #observers = new Set();

  subscribe(observer) {
    if (typeof observer !== "function") {
      throw new TypeError("observer must be a function");
    }

    this.#observers.add(observer);

    // 구독 해제 함수를 반환해 호출자가 수명 주기를 관리하게 한다.
    return () => this.#observers.delete(observer);
  }

  notify(event) {
    for (const observer of [...this.#observers]) {
      observer(event);
    }
  }

  get observerCount() {
    return this.#observers.size;
  }
}

export class StockPrice extends Subject {
  #price;

  constructor(symbol, initialPrice) {
    super();
    this.symbol = symbol;
    this.#price = initialPrice;
  }

  get price() {
    return this.#price;
  }

  updatePrice(price) {
    if (!Number.isFinite(price) || price < 0) {
      throw new RangeError("price must be a non-negative number");
    }

    const previousPrice = this.#price;
    this.#price = price;
    this.notify({
      type: "PRICE_CHANGED",
      symbol: this.symbol,
      previousPrice,
      price,
    });
  }
}
