import { r as registerInstance, h } from './index-11c739df.js';

const sideBarCss = "aside{position:fixed;top:0;left:-100;width:30rem;max-width:80%;height:100vh;background:#e6e6e6;box-shadow:0 2px 8px rgb(12, 75, 168);transition:0.3s ease-out}:hover([opened]) aside{left:0}header{padding:1rem;background:rgb(12, 75, 168);position:relative}header h1{font-size:1.5rem;color:white;margin:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background:transparent;font-size:1.5rem;border:none}header button:focus{outline:none}#tab{display:flex;justify-content:center;width:100%;margin:1rem 0}#tab button{width:30%;background:white;color:rgb(12, 75, 168);text-align:center;border:1px solid rgb(12, 75, 168);font:inherit;padding:0.15rem 0}#tab button.active,#tab button:hover,#tab button:active{background:rgb(12, 75, 168);color:white}#tab button:focus{outline:none}#personal-information{padding:0 1rem}";

const SideBar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.showInfor = false;
    this.title = undefined;
    this.opened = undefined;
  }
  onCloseSideBar() {
    this.opened = false;
  }
  onTabSwitch(content) {
    this.showInfor = content === "info";
    this.showInfor = content === "nav";
  }
  open() {
    this.opened = true;
  }
  render() {
    let mainContent = h("slot", null);
    if (this.showInfor) {
      mainContent = (h("div", { id: 'personal-information' }, h("h2", null, "Personal Information"), h("p", null, "This is Ha personal detail"), h("ul", null, h("li", null, "Phone: 0943546581"), h("li", null, "Email: ", h("a", { href: '#' }, "nguyenxuanha168800@gmail.com")))));
    }
    let content = null;
    if (this.opened) {
      content = (h("aside", null, h("header", null, h("h1", null, this.title), h("button", { onClick: this.onCloseSideBar.bind(this) }, "X")), h("section", { id: 'tab' }, h("button", { class: this.showInfor ? "active" : "", onClick: this.onTabSwitch.bind(this, "nav") }, "Profile"), h("button", { class: !this.showInfor ? "active" : "", onClick: this.onTabSwitch.bind(this, "info") }, "Navigation")), h("main", null, mainContent)));
    }
    return content;
  }
};
SideBar.style = sideBarCss;

export { SideBar as side_bar };

//# sourceMappingURL=side-bar.entry.js.map