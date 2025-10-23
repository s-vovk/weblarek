import { ensureElement } from "src/utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IHeader {
  counter: number
}

export class Header extends Component<IHeader> {
  protected basketButton: HTMLButtonElement
  protected counterElement: HTMLElement

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)

    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container)
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container)

    this.basketButton.addEventListener('click', () => events.emit('basket:open'))
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value)
  }
}