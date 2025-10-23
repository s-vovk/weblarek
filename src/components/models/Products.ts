import { IProduct } from 'src/types'
import { IEvents } from '../base/Events'

export class Products {
  private items: IProduct[]
  private selectedItem?: IProduct

  constructor(protected events: IEvents) {
    this.items = []
  }

  setItems(items: IProduct[]) {
    this.items = items
    this.events.emit('catalog:change')
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