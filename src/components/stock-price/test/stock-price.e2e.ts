import { newE2EPage } from '@stencil/core/testing';

describe('stock-price', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stock-price></stock-price>');

    const element = await page.find('stock-price');
    expect(element).toHaveClass('hydrated');
  });
});
