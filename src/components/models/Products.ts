import { IProduct } from 'src/types'

export class Products {
  private items: IProduct[]
  private selectedItem?: IProduct

  constructor() {
    this.items = []
  }

  setItems(items: IProduct[]) {
    this.items = items
  }

  getItems() {
    return this.items
  }

  getItem(id: string) {
    return this.items.find(item => item.id === id)
  }

  setSelectedItem(id: string) {
    this.selectedItem = this.items.find(item => item.id === id)
  }

  getSelectedItem() {
    return this.selectedItem
  }
}