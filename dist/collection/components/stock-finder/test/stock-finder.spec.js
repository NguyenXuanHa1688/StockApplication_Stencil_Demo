import { StockFinder } from '../stock-finder';
describe('StockFinder', () => {
  let component;
  beforeEach(() => {
    component = new StockFinder();
    component.error = null;
  });
  test('onFindStock - sets searchResult when valid symbol is provided', async () => {
    const stockName = 'AAPL';
    const mockResponse = {
      "bestMatches": [
        {
          "1. symbol": "AAPL",
          "2. name": "Apple Inc."
        }
      ]
    };
    global.fetch = jest.fn().mockImplementation(() => {
      const response = {
        ok: true,
        json: () => Promise.resolve({ mockResponse })
      };
      return Promise.resolve(response);
    });
    component.stockNameInput = document.createElement('input');
    component.stockNameInput.value = stockName;
    await component.onFindStock(new Event('submit'));
    expect(component.searchResult).toEqual([
      { name: 'Apple Inc.', symbol: 'AAPL' }
    ]);
    console.log(component.searchResult);
    expect(component.error).toBeNull();
    expect(component.loading).toBe(false);
  });
  test('onFindStock - sets error and loading when invalid symbol is provided', async () => {
    const stockName = 'INVALID';
    const mockResponse = {
      "Error Message": "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for SYMBOL_SEARCH."
    };
    global.fetch = jest.fn().mockImplementation(() => {
      const response = {
        ok: true,
        json: () => Promise.resolve({ mockResponse })
      };
      return Promise.resolve(response);
    });
    component.stockNameInput = document.createElement('input');
    component.stockNameInput.value = stockName;
    await component.onFindStock(new Event('submit'));
    expect(component.searchResult).toEqual([]);
    expect(component.error).toBe('Invalid symbol');
    expect(component.loading).toBe(false);
  });
  test('onSelectSymbol - emits ucSymbolSelected event with symbol', () => {
    const symbol = 'AAPL';
    const emitSpy = jest.spyOn(component.ucSymbolSelected, 'emit');
    component.onSelectSymbol(symbol);
    expect(emitSpy).toHaveBeenCalledWith(symbol);
  });
});
//# sourceMappingURL=stock-finder.spec.js.map
