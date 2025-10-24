import { ensureElement } from "src/utils/utils";
import { BaseProductCard } from "./BaseProductCard";
import { setCategoryElement, setImageElement } from "../../utils/ProductUtils";

interface IProductDetails {
  category: string
  image: string
  text: string
  buttonLabel: string
  isButtonDisabled: boolean
}

interface IActions {
  onClick: () => void
}

export class ProductDetails extends BaseProductCard<IProductDetails> {
  protected categoryElement: HTMLElement
  protected imageElement: HTMLImageElement
  protected textElement: HTMLElement
  protected basketButton: HTMLButtonElement

  constructor(container: HTMLElement, actions: IActions) {
    super(container)

    this.categoryElement = ensureElement('.card__category', this.container)
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
    this.textElement = ensureElement('.card__text', this.container)
    this.basketButton = ensureElement<HTMLButtonElement>('.card__button', this.container)

    this.basketButton.addEventListener('click', actions.onClick)
  }

  set category(value: string) {
    setCategoryElement(this.categoryElement, value)
  }

  set image(value: string) {
    setImageElement({ element: this.imageElement, value, alt: this.imageAlt })
  }

  set text(value: string) {
    this.textElement.textContent = value
  }

  set buttonLabel(value: string) {
    this.basketButton.textContent = value
  }

  set isButtonDisabled(value: boolean) {
    this.basketButton.disabled = value
  }
}