import { h } from '@stencil/core';
import { API_KEY } from '../../global/global';
export class StockFinder {
  constructor() {
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
  render() {
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
  static get is() { return "stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["stock-finder.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["stock-finder.css"]
    };
  }
  static get states() {
    return {
      "searchResult": {},
      "loading": {},
      "error": {},
      "stockInputValid": {}
    };
  }
  static get events() {
    return [{
        "method": "ucSymbolSelected",
        "name": "ucSymbolSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=stock-finder.js.map
