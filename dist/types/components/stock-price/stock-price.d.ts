export declare class StockPrice {
  stockInput: HTMLInputElement;
  el: HTMLElement;
  fetchPrice: number;
  stockUserInput: string;
  stockInputValid: boolean;
  error: string;
  loading: boolean;
  stockSymbol: string;
  stockSymbolChanged(newValue: string, oldValue: string): void;
  onUserInput(event: Event): void;
  onFetchStockPrice(event: Event): void;
  componentDidLoad(): void;
  onStockSymbolSelected(event: CustomEvent): void;
  test(): void;
  fetchStockPrice(stockSymbol: string): void;
  hostData(): {
    class: string;
  };
  render(): any[];
}
