import { SideBar } from '../side-bar';
describe('SideBar', () => {
  let component;
  beforeEach(() => {
    component = new SideBar();
  });
  test('onCloseSideBar - sets opened to false', () => {
    component.opened = true;
    component.onCloseSideBar();
    expect(component.opened).toBe(false);
  });
  test('onTabSwitch - sets showInfor to true when content is "info"', () => {
    component.onTabSwitch('info');
    expect(component.showInfor).toBe(false);
  });
  test('onTabSwitch - sets showInfor to false when content is "nav"', () => {
    component.onTabSwitch('nav');
    expect(component.showInfor).toBe(true);
  });
});
//# sourceMappingURL=side-bar.spec.js.map
