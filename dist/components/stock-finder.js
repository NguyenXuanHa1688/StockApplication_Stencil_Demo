import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { A as API_KEY } from './global.js';

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid rgb(12, 75, 168);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:rgb(0, 0, 0);padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}:host(.error){border-color:red}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid rgb(33, 93, 141);background:rgb(19, 61, 120);color:white;cursor:pointer}form button:hover,form button:active{background:rgb(128, 188, 248);border-color:rgb(128, 188, 248)}form button:disabled{background:gray;border-color:gray;color:white;cursor:not-allowed}ul{margin:0;list-style:none;padding:0}li{margin:0.25rem 0;padding:0.25rem;border:1px solid rgb(193, 193, 193)}li:hover,li:active{background:rgb(128, 188, 248);color:white}.lds-ripple{display:inline-block;position:relative;width:80px;height:80px}.lds-ripple div{position:absolute;border:4px solid rgb(33, 93, 141);opacity:1;border-radius:50%;animation:lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite}.lds-ripple div:nth-child(2){animation-delay:-0.5s}@keyframes lds-ripple{0%{top:36px;left:36px;width:0;height:0;opacity:0}4.9%{top:36px;left:36px;width:0;height:0;opacity:0}5%{top:36px;left:36px;width:0;height:0;opacity:1}100%{top:0px;left:0px;width:72px;height:72px;opacity:0}}";

const StockFinder$1 = /*@__PURE__*/ proxyCustomElement(class StockFinder extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.ucSymbolSelected = createEvent(this, "ucSymbolSelected", 7);
    this.searchResult = [];
    this.loading = false;
    this.error = undefined;
    this.stockInputValid = false;
  }
  onFindStock(event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(parseRes => {
      if (!parseRes["bestMatches"]) {
        throw new Error("Invalid symbol");
      }
      this.searchResult = parseRes["bestMatches"].map(match => {
        return { name: match["2. name"], symbol: match["1. symbol"] };
      });
      this.error = null;
      this.loading = false;
    })
      .catch(err => {
      console.log(err);
      this.error = err.message;
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    this.ucSymbolSelected.emit(symbol);
  }
  hostData() {
    return {
      class: this.error ? "error" : ""
    };
  }
  __stencil_render() {
    let content = h("ul", null, this.searchResult.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name))));
    if (this.loading) {
      content = (h("div", { class: "lds-ripple" }, h("div", null), h("div", null)));
    }
    if (this.error) {
      content = h("p", null, this.error);
    }
    return [
      h("form", { onSubmit: this.onFindStock.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }), h("button", { type: 'submit' }, "Find")),
      content
    ];
  }
  static get style() { return stockFinderCss; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
}, [1, "stock-finder", {
    "searchResult": [32],
    "loading": [32],
    "error": [32],
    "stockInputValid": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["stock-finder"];
  components.forEach(tagName => { switch (tagName) {
    case "stock-finder":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StockFinder$1);
      }
      break;
  } });
}

const StockFinder = StockFinder$1;
const defineCustomElement = defineCustomElement$1;

export { StockFinder, defineCustomElement };

//# sourceMappingURL=stock-finder.js.map