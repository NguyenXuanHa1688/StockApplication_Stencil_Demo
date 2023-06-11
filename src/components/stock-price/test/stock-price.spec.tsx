import { StockPrice } from '../stock-price';

describe('StockPrice', () => {
  let component: StockPrice;
  let stockInput: HTMLInputElement;

  beforeEach(() => {
    component = new StockPrice();
    component.fetchStockPrice = jest.fn();
    stockInput = document.createElement('input');
    stockInput.type = 'text';
    stockInput.value = 'AA';
    component.stockInput = stockInput;

    global.fetch = jest.fn().mockImplementation(() => {
      const response = {
        ok: true,
        json: () => Promise.resolve({
          'Global Quote': {
            '05. price': '180.57'
          }
        })
      };
      return Promise.resolve(response);
    });
  });

  test('onUserInput - sets stockUserInput and stockInputValid when input is valid', () => {
    const event = { target: { value: 'AAPL' } } as unknown as Event;
    component.onUserInput(event);
    expect(component.stockUserInput).toBe('AAPL');
    expect(component.stockInputValid).toBe(true);
  });

  test('onUserInput - sets stockInputValid to false when input is empty', () => {
    const event = { target: { value: '' } } as unknown as Event;
    component.onUserInput(event);
    expect(component.stockInputValid).toBe(false);
  });

  test('stockSymbolChanged - sets stockUserInput, stockInputValid, and fetches stock price when stockSymbol changes', () => {
    const newValue = 'AAPL';
    const oldValue = 'GOOG';
    component.stockSymbolChanged(newValue, oldValue);
    expect(component.stockUserInput).toBe(newValue);
    expect(component.stockInputValid).toBe(true);
    expect(component.fetchStockPrice).toHaveBeenCalledWith(newValue);
  });

  test('stockSymbolChanged - does not set stockUserInput, stockInputValid, or fetch stock price when stockSymbol does not change', () => {
    const newValue = 'AAPL';
    const oldValue = 'AAPL';
    component.stockSymbolChanged(newValue, oldValue);
    expect(component.stockUserInput).not.toBe(newValue);
    expect(component.stockInputValid).not.toBe(true);
    expect(component.fetchStockPrice).not.toHaveBeenCalled();
  });

  test('onFetchStockPrice - testing the event.preventDefault in the fetch stock price function ', () => {
    const event = { preventDefault: jest.fn() } as unknown as Event;
    component.onFetchStockPrice(event);
    expect(component.stockSymbol).toBe(component.stockInput.value);
  })

  test('componentDidLoad - sets stockUserInput, stockInputValid, and fetches stock price when stockSymbol is present', () => {
    component.stockSymbol = 'AAPL';
    component.componentDidLoad();
    expect(component.stockUserInput).toBe('AAPL');
    expect(component.stockInputValid).toBe(true);
    expect(component.fetchStockPrice).toHaveBeenCalledWith('AAPL');
  });

  test('componentDidLoad - sets stockUserInput, stockInputValid, and fetches stock price when stockSymbol is not present', () => {
    component.stockSymbol = '';
    component.componentDidLoad();
    expect(component.stockUserInput).toBeUndefined();
    expect(component.stockInputValid).toBe(false);
    expect(component.fetchStockPrice).not.toHaveBeenCalled();
  });

  test('onStockSymbolSelected - updates stockSymbol when all the condition is valid', () => {
    const event = new CustomEvent('ucSymbolSelected', { detail: 'AAPL' });
    component.onStockSymbolSelected(event);
    expect(component.stockSymbol).toBe(event.detail);
  });

  test('onStockSymbolSelected - updates stockSymbol when only 1 of the condition is valid - case 1: event.detail = null', () => {
    const event = new CustomEvent('ucSymbolSelected', { detail: null });
    component.onStockSymbolSelected(event);
    expect(component.stockSymbol).toBeUndefined();
  });

  test('onStockSymbolSelected - updates stockSymbol when only 1 of the condition is valid - case 2: event.detail != null && event.detail == this.stockSymbol', () => {
    const event = new CustomEvent('ucSymbolSelected', { detail: 'AAPL' });
    component.stockSymbol = 'AAPL';
    component.onStockSymbolSelected(event);
    expect(component.stockSymbol).toBe('AAPL');
  });

  test('fetchStockPrice - API working when stockSymbol is valid', async() => {
    const testPrice = await component.fetchStockPrice('AAPL');
    console.log(component.fetchPrice);
    expect(testPrice).toBe(180.57);
    expect(component.error).toBeNull();
    expect(component.loading).toBe(false);
  })

  test('fetchStockPrice - API give error when stockSymbol is invalid', async() => {
    const testPrice = await component.fetchStockPrice('HDAGDSFHASFDHGAD');
    console.log(component.fetchPrice);
    expect(testPrice).toBeNull();
    expect(component.error).not.toBeNull();
    expect(component.loading).toBe(false);
  })
});
