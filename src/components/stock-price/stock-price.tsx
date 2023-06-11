import { Component, Host, State, h, Element, Prop, Watch, Listen } from '@stencil/core';
import { API_KEY } from '../../global/global';

@Component({
  tag: 'stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement

  @Element() el:HTMLElement

  @State() fetchPrice: number
  @State() stockUserInput: string
  @State() stockInputValid = false
  @State() error: string
  @State() loading = false

  @Prop({mutable: true, reflect: true}) stockSymbol: string

  @Watch("stockSymbol")
  stockSymbolChanged(newValue: string, oldValue: string) {
    if(newValue !== oldValue){
      this.stockUserInput = newValue
      this.stockInputValid = true
      this.fetchStockPrice(newValue)
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value
    if(this.stockUserInput.trim() !== ""){
      this.stockInputValid = true
    } else {
      this.stockInputValid = false
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault()
    this.stockSymbol = this.stockInput.value
  }

  componentDidLoad() {
    if(this.stockSymbol){
      this.stockUserInput = this.stockSymbol
      this.stockInputValid = true
      this.fetchStockPrice(this.stockSymbol)
    }
  }

  @Listen("ucSymbolSelected", { target: 'body' })
  onStockSymbolSelected(event: CustomEvent){
    if(event.detail && event.detail !== this.stockSymbol){
      this.stockSymbol = event.detail
    }
  }

  test(){
    this.loading = true
  }

  fetchStockPrice(stockSymbol: string){
    this.loading = true
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
      .then(res => {
        return res.json()
      })
      .then(parseRes => {
        if(!parseRes["Global Quote"]["05. price"]){
          throw new Error("Invalid symbol")
        }
        this.error = null
        this.fetchPrice = +parseRes["Global Quote"]["05. price"]
        console.log(parseRes)
        this.loading = false
      })
      .catch(err => {
        this.fetchPrice = null
        this.error = err.message
        this.loading = false
      })
  }

  hostData() {
    return {
      class: this.error ? "error" : ""
    }
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>
    if(this.error) {
      dataContent = <p>{this.error}</p>
    }
    if(this.fetchPrice) {
      dataContent = <p>Price: ${this.fetchPrice}</p>
    }
    if(this.loading){
      dataContent = (<div class="lds-ripple"><div></div><div></div></div>)
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" 
                ref={el => (this.stockInput = el)} 
                value={this.stockUserInput}
                onInput={this.onUserInput.bind(this)}/>
        <button type='submit' disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,
      <div>
        {dataContent}
      </div>
    ]
  }
}
