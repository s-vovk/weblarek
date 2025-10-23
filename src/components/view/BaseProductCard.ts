import { ensureElement } from "src/utils/utils";
import { Component } from "../base/Component";

interface IBaseProductCard {
  title: string
  price: number | null
}

export class BaseProductCard<T> extends Component<IBaseProductCard & T> {
  protected titleElement: HTMLElement
  protected priceElement: HTMLElement
  protected imageAlt: string

  constructor(container: HTMLElement) {
      super(container)
  
      this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
      this.priceElement = ensureElement<HTMLButtonElement>('.card__price', this.container)
      this.imageAlt = ''
  }

  set title(value: string) {
    this.titleElement.textContent = value
    this.imageAlt = value
  }
  
  set price(value: number | null) {
    this.priceElement.textContent = value ? `${value} синапсов` : 'Бесценно'
  }  
}