import { IProduct } from 'src/types'
import { IEvents } from '../base/Events'

export class Cart {
  private items: IProduct[]

  constructor(protected events: IEvents) {
    this.items = []
  }

  getItems() {
    return this.items
  }

  addItem (item: IProduct){
    this.items.push(item)
    this.events.emit('basket:change')
  }

  removeItem(id: string) {
    const index = this.items.findIndex(item => item.id === id)
    if (index !== -1) {
      this.items.splice(index, 1)
      this.events.emit('basket:change')
    }
  }

  removeAll() {
    this.items = []
    this.events.emit('basket:change')
  }

  getTotalCoast(): number{
    return this.items.reduce((accumulator, item) => accumulator + (item.price ?? 0), 0)
  }

  getItemsCount(): number{
    return this.items.length
  }

  hasItem (id: string): boolean {
    return this.items.some(item => item.id === id)
  }
}