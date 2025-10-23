import { Products, Cart, Buyer } from 'src/components/models'
import { apiProducts } from 'src/utils/data'


// Вспомогательные функции для теста методов
const assert = (condition: boolean, message: string) => {
  console.assert(condition, message)
}

const error = (method: string): string => {
  return `Ошибка: метод ${method} не работает!`
}

const randomItem = <T>(items: T[]): T => {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

const products = new Products()
const cart = new Cart()
const buyer = new Buyer()

/* Тестируем методы Produts */
  console.log('Тестируем методы класса Products...')

  const items = apiProducts.items
  products.setItems(items)

  assert(
    products.getItems() === items, 
    error('setItems или getItems')
  )

  const item1 = randomItem(items) // Выбираем произвольный элемент из массива

  assert(
    products.getItem(item1.id) === item1,
    error('getItem')
  )

  products.setSelectedItem(item1.id)
  
  assert(
    products.getSelectedItem() === item1,
    error('setSelectedItem или getSelectedItem')
  )

  /* Тестируем методы Cart */
  console.log('Тестируем методы класса Cart...')

  cart.addItem(item1)
  assert(
    cart.getItems()[0] === item1,
    error('addItem или getItems')
  )

  const item2 = randomItem(items)

  cart.addItem(item2)
  assert(
    cart.getItemsCount() === 2,
    error('getItemsCount')
  )

  assert(
    cart.hasItem(item2.id),
    error('hasItem')
  )

  assert(
    cart.getTotalCoast() === ((item1.price ?? 0)+ (item2.price ?? 0)) ,
    error('getTotalCoast')
  )
  
  cart.removeItem(item2.id)

  assert(
    cart.getItemsCount() === 1,
    error('removeItem')
  )

  cart.removeAll()

  assert(
    cart.getItemsCount() === 0,
    error('removeAll')
  )

  /* Тестируем методы Bayer */
  console.log('Тестируем методы класса Bayer...')

  const payment = 'online'
  const email = 'test@yandex.ru'
  const phone = '112'
  const address = 'На деревню дедушке'

  assert(
    buyer.validatePayment(payment).isValid,
    error('validatePayment')
  )

  buyer.setPayment(payment)

  assert(
    buyer.getData().payment === payment,
    error('setPayment')
  )

  assert(
    buyer.validateEmail(email).isValid,
    error('validateEmail')
  )

  buyer.setEmail(email)

  assert(
    buyer.getData().email === email,
    error('setEmail')
  )

  assert(
    buyer.validatePhone(phone).isValid,
    error('validatePhone')
  )

  buyer.setPhone(phone)

  assert(
    buyer.getData().phone === phone,
    error('setPhone')
  )

  assert(
    buyer.validateAdress(address).isValid,
    error('validateAdress')
  )

  buyer.setAdress(address)

  assert(
    buyer.getData().address === address,
    error('setAdress')
  )
 
  buyer.removeData()
  const data = buyer.getData()

  assert(
    !data.payment && !data.phone && !data.email && !data.address,
    error('removeData')
  )

