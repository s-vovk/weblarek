import { ensureElement } from "src/utils/utils";
import { BaseProductCard } from "./BaseProductCard";

interface IProductCart {
  index: number
}

interface IActions {
  onRemoveItem: () => void
}

export class ProductBasket extends BaseProductCard<IProductCart> {
  protected indexElement: HTMLElement
  protected deleteButton: HTMLButtonElement

  constructor(container: HTMLElement, protected actions: IActions) {
    super(container)

    this.indexElement = ensureElement('.basket__item-index', this.container)
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

    this.deleteButton.addEventListener('click', actions.onRemoveItem)
  }

  set index(value: number) {
    this.indexElement.textContent = String(value)
  }
}