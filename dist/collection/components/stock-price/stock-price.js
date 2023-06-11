import { h } from '@stencil/core';
import { API_KEY } from '../../global/global';
export class StockPrice {
  constructor() {
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
  render() {
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
  static get is() { return "stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["stock-price.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["stock-price.css"]
    };
  }
  static get properties() {
    return {
      "stockSymbol": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "stock-symbol",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "fetchPrice": {},
      "stockUserInput": {},
      "stockInputValid": {},
      "error": {},
      "loading": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "stockSymbol",
        "methodName": "stockSymbolChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "ucSymbolSelected",
        "method": "onStockSymbolSelected",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=stock-price.js.map
