import { h } from '@stencil/core';
export class SideBar {
  constructor() {
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
  static get is() { return "side-bar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["side-bar.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["side-bar.css"]
    };
  }
  static get properties() {
    return {
      "title": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "title",
        "reflect": true
      },
      "opened": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "opened",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "showInfor": {}
    };
  }
  static get methods() {
    return {
      "open": {
        "complexType": {
          "signature": "() => void",
          "parameters": [],
          "references": {},
          "return": "void"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
}
//# sourceMappingURL=side-bar.js.map
