import { Component, Host, State, h, Event } from '@stencil/core';
import { API_KEY } from '../../global/global';
import { EventEmitter } from 'stream';

@Component({
  tag: 'stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement

  @State() searchResult: {symbol: string, name: string}[] = []
  @State() loading = false
  @State() error: string
  @State() stockInputValid = false

  @Event({bubbles: true, composed: true}) ucSymbolSelected: EventEmitter

  onFindStock(event: Event){
    event.preventDefault()
    this.loading = true
    const stockName = this.stockNameInput.value
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(parseRes => {
        if(!parseRes["bestMatches"]){
          throw new Error("Invalid symbol")
        }
        this.searchResult = parseRes["bestMatches"].map(match => {
          return { name: match["2. name"], symbol: match["1. symbol"]}
        })
        this.error = null
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.error = err.message
        this.loading = false
      })
  }

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol)
  }

  hostData() {
    return {
      class: this.error ? "error" : ""
    }
  }


  render() {
    let content = <ul>
                    {
                      this.searchResult.map(result => (
                        <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
                          <strong>{result.symbol}</strong> - {result.name}
                        </li>
                      ))
                    }
                  </ul>
    if(this.loading) {
      content = (<div class="lds-ripple"><div></div><div></div></div>)
    }    
    if(this.error) {
      content = <p>{this.error}</p>
    }          
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input id="stock-symbol" 
                ref={el => (this.stockNameInput = el)} 
                />
        <button type='submit'>Find</button>
      </form>,
      content      
    ]
  }

}
