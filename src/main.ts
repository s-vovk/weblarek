import './scss/styles.scss';
import { Products, Cart, Buyer, ServerData } from 'src/components/models';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { Header } from './components/view/Header';
import { Modal } from './components/view/Modal';
import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Catalog } from './components/view/Catalog';
import { ProductCard } from './components/view/ProductCard';
import { IProduct, TPayment } from './types';
import { ProductDetails } from './components/view/ProductDetails';
import { ProductBasket } from './components/view/ProductBasket';
import { Basket } from './components/view/Basket';
import { OrderAddress } from './components/view/OrderAddress';
import { OrderContacts } from './components/view/OrderContacts';
import { OrderSuccess } from './components/view/OrderSuccess';

const events = new EventEmitter()

const products = new Products(events)
const cart = new Cart(events)
const buyer = new Buyer()

const api = new Api(API_URL)
const serverData = new ServerData(api)

const fetchProducts = async () => {
  const serverProducts = await serverData.getProducts()
  products.setItems(serverProducts.items)
}

events.on('catalog:change', () => {
  const cards = products.getItems().map(product => {
    const container = cloneTemplate('#card-catalog')
    const actions = {
      onProductClick: () => events.emit('catalog:product:click', product),
    }

    const card = new ProductCard(container, actions)
    return card.render(product)
  })

  const container = ensureElement('.gallery')
  container.replaceChildren()

  const catalog = new Catalog(container)
  catalog.render({ cards })
})

const createHeader = () => {
  const container = ensureElement('.header__container')
  return new Header(container, events)
}

const createModal = () => {
  const container = ensureElement('#modal-container')
  return new Modal(container, events)
}

const createBasket = () => {
  const container = cloneTemplate('#basket')
  return new Basket(container, events)
}

const createOrderContacts = () => {
  const container = cloneTemplate('#contacts')
  return new OrderContacts(container, events)
}

const createOrderAddress = () => {
  const container = cloneTemplate('#order')
  return new OrderAddress(container, events)
}

const createOrderSuccess = () => {
  const container = cloneTemplate('#success')
  return new OrderSuccess(container, events)
}

document.addEventListener('DOMContentLoaded', async () => {
  // Получаем данные о товарах с сервера
  fetchProducts()

  const modal = createModal()
  const header = createHeader()
  const basket = createBasket()
  const orderContacts = createOrderContacts()
  const orderAddress = createOrderAddress()
  const orderSuccess = createOrderSuccess()

  let isBasketOpen = false

  events.on('modal:close', () => {
    isBasketOpen = false
    modal.close()
  }) 

  events.on('product:details:button:click', (product: IProduct) => {
    modal.close()

    if (cart.hasItem(product.id)) {
      cart.removeItem(product.id)
    } else {
      cart.addItem(product)
    }
  })
  
  events.on('catalog:product:click', (product: IProduct) => {
    const container = cloneTemplate('#card-preview')
    const actions = { 
      onClick: () => events.emit('product:details:button:click', product) 
    }

    const details = new ProductDetails(container, actions)
    const isProductInCart = cart.hasItem(product.id)
    const buttonLabel = product.price ? (isProductInCart ? 'Удалить из корзины' : 'Купить') : 'Недоступно' 
    const isButtonDisabled = !product.price
    const content = details.render({ ... product, buttonLabel, isButtonDisabled })

    modal.render({ content })
    modal.open()
  })

  events.on('basket:change', () => {
    const counter = cart.getItemsCount()
    header.render({ counter })

    if (isBasketOpen) {
      const content = getBasketContent()
      modal.render({ content })
    }
  })

  events.on('basket:product:remove', (product: IProduct) => {
    cart.removeItem(product.id)
  })

  events.on('basket:create:order', () => {
    isBasketOpen = false
    const content = getOrderAddressContent()
    modal.render({ content })
  })

  const getBasketContent = () => {
    const items = cart.getItems().map((product, index) => {
      const container = cloneTemplate('#card-basket')
      const actions = { 
        onRemoveItem: () => events.emit('basket:product:remove', product) 
      }
      const card = new ProductBasket(container, actions)
      return card.render({ ...product, index: index + 1 })
    })

    const orderAmount = cart.getTotalCoast()
    return basket.render({ items, orderAmount })
  }

  events.on('basket:open', () => {
    const content = getBasketContent()
    modal.render({ content })
    modal.open()
    
    isBasketOpen = true
  })

  const getOrderContactsContent = () => {
    const data = buyer.getData()
    const { error = '', isValid } = buyer.validateContactsForm()
    return orderContacts.render({ ...data, error, isSubmitEnabled: isValid })
  }

  const getOrderAddressContent = () => {
    const data = buyer.getData()
    const { error = '', isValid } = buyer.validateAddressForm()
    return orderAddress.render({ ...data, error, isSubmitEnabled: isValid })
  }

  events.on('order:payment:change', ({ payment }: { payment: TPayment}) => {
    buyer.setPayment(payment)
    const content = getOrderAddressContent()
    modal.render({ content })
  })

  events.on('order:address:change', ({ address }: { address: string}) => {
    buyer.setAddress(address)
    const content = getOrderAddressContent()
    modal.render({ content })
  })

  events.on('order:email:change', ({ email }: { email: string}) => {
    buyer.setEmail(email)
    const content = getOrderContactsContent()
    modal.render({ content })
  })

  events.on('order:phone:change', ({ phone }: { phone: string}) => {
    buyer.setPhone(phone)
    const content = getOrderContactsContent()
    modal.render({ content })
  })

  const createOrder = () => {
    const orderAmount = cart.getTotalCoast()
    cart.removeAll()
    buyer.removeData()

    const content = orderSuccess.render({ orderAmount })
    modal.render({ content })
  }
  
  events.on('order:submit', ({ step }: { step: 'address' | 'contacts'}) => {
    if (step === 'address') {
      const content = getOrderContactsContent()
      modal.render({ content })
    } else if (step === 'contacts') {
      createOrder()
    }
  })

  events.on('order:done', () => {
    modal.close()
  })
})
