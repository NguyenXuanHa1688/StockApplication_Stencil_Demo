import { r as registerInstance, h, g as getElement, f as Host } from './index-11c739df.js';
import { A as API_KEY } from './global-892a1e04.js';

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid rgb(12, 75, 168);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:rgb(0, 0, 0);padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid rgb(33, 93, 141);background:rgb(19, 61, 120);color:white;cursor:pointer}form button:hover,form button:active{background:rgb(128, 188, 248);border-color:rgb(128, 188, 248)}form button:disabled{background:gray;border-color:gray;color:white;cursor:not-allowed}:host(.error){border-color:red}.lds-ripple{display:inline-block;position:relative;width:80px;height:80px}.lds-ripple div{position:absolute;border:4px solid rgb(33, 93, 141);opacity:1;border-radius:50%;animation:lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite}.lds-ripple div:nth-child(2){animation-delay:-0.5s}@keyframes lds-ripple{0%{top:36px;left:36px;width:0;height:0;opacity:0}4.9%{top:36px;left:36px;width:0;height:0;opacity:0}5%{top:36px;left:36px;width:0;height:0;opacity:1}100%{top:0px;left:0px;width:72px;height:72px;opacity:0}}";

const StockPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fetchPrice = undefined;
    this.stockUserInput = undefined;
    this.stockInputValid = false;
    this.error = undefined;
    this.loading = false;
    this.stockSymbol = undefined;
  }
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  onUserInput(event) {
    this.stockUserInput = event.target.value;
    if (this.stockUserInput.trim() !== "") {
      this.stockInputValid = true;
    }
    else {
      this.stockInputValid = false;
    }
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }
  componentDidLoad() {
    if (this.stockSymbol) {
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  onStockSymbolSelected(event) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  test() {
    this.loading = true;
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
      .then(res => {
      return res.json();
    })
      .then(parseRes => {
      if (!parseRes["Global Quote"]["05. price"]) {
        throw new Error("Invalid symbol");
      }
      this.error = null;
      this.fetchPrice = +parseRes["Global Quote"]["05. price"];
      console.log(parseRes);
      this.loading = false;
    })
      .catch(err => {
      this.fetchPrice = null;
      this.error = err.message;
      this.loading = false;
    });
  }
  hostData() {
    return {
      class: this.error ? "error" : ""
    };
  }
  __stencil_render() {
    let dataContent = h("p", null, "Please enter a symbol");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.fetchPrice) {
      dataContent = h("p", null, "Price: $", this.fetchPrice);
    }
    if (this.loading) {
      dataContent = (h("div", { class: "lds-ripple" }, h("div", null), h("div", null)));
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: 'submit', disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent)
    ];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = stockPriceCss;

export { StockPrice as stock_price };

//# sourceMappingURL=stock-price.entry.js.map