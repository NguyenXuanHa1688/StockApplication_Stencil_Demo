import { newE2EPage } from '@stencil/core/testing';

describe('stock-finder', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stock-finder></stock-finder>');

    const element = await page.find('stock-finder');
    expect(element).toHaveClass('hydrated');
  });
});
