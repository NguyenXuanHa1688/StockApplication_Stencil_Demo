/// <reference types="node" />
import { EventEmitter } from 'stream';
export declare class StockFinder {
  stockNameInput: HTMLInputElement;
  searchResult: {
    symbol: string;
    name: string;
  }[];
  loading: boolean;
  error: string;
  stockInputValid: boolean;
  ucSymbolSelected: EventEmitter;
  onFindStock(event: Event): void;
  onSelectSymbol(symbol: string): void;
  hostData(): {
    class: string;
  };
  render(): any[];
}
