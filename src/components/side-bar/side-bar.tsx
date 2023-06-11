import { Component, Host, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'side-bar',
  styleUrl: 'side-bar.css',
  shadow: true,
})
export class SideBar {
  @State() showInfor = false

  @Prop({reflect: true}) title: string
  @Prop({reflect: true, mutable: true}) opened: boolean

  onCloseSideBar() {
    this.opened = false
  }

  onTabSwitch(content: string) {
    this.showInfor = content === "info"
    this.showInfor = content === "nav"
  }

  @Method()
  open() {
    this.opened = true
  }

  render() {
    let mainContent = <slot />
    if(this.showInfor){
      mainContent = (
        <div id='personal-information'>
          <h2>Personal Information</h2>
          <p>This is Ha personal detail</p>
          <ul>
            <li>Phone: 0943546581</li>
            <li>Email: <a href='#'>nguyenxuanha168800@gmail.com</a></li>
          </ul>
        </div>
      )
    }

    let content = null
    if(this.opened){
      content = (
        <aside>
          <header>
            <h1>{this.title}</h1>
            <button onClick={this.onCloseSideBar.bind(this)}>X</button>
          </header>
          <section id='tab'>
            <button class={this.showInfor ? "active" : ""} onClick={this.onTabSwitch.bind(this, "nav")}>Profile</button>
            <button class={!this.showInfor ? "active" : ""} onClick={this.onTabSwitch.bind(this, "info")}>Navigation</button>
          </section>
          <main>
            {mainContent}
          </main>
        </aside>
      )
    }
    return content
  }
}
