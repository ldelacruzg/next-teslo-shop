import { CartProdcut, OrderSummary } from '@/interfaces';
import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';

interface State {
  cart: CartProdcut[];
}

interface Actions {
  getTotalItems: () => number;
  getOrderSummary: () => OrderSummary;
  addProdcutToCart: (product: CartProdcut) => void;
  changeQuantityProduct: (product: CartProdcut, quantity: number) => void;
  removeProductToCart: (product: CartProdcut) => void;
}

type CartStore = State & Actions;
type CartStateCreator = StateCreator<CartStore, [["zustand/devtools", never], ["zustand/persist", unknown]]>;

const initializer: CartStateCreator = (set, get) => ({
  cart: [],
  getTotalItems: () => get().cart.reduce((prevValue, currentValue) => prevValue + currentValue.quantity, 0),
  getOrderSummary: () => {
    const { cart, getTotalItems } = get()
    const subtotal = cart.reduce((prevValue, currentValue) => prevValue + (currentValue.quantity * currentValue.price), 0)
    const tax = subtotal * 0.15
    const total = subtotal + tax

    return {
      subtotal, tax, total,
      totalProducts: getTotalItems()
    }
  },
  addProdcutToCart: (product) => {
    const { cart } = get()

    // add product if not exist
    const productIndex = cart.findIndex(p => p.id === product.id && p.size === product.size)
    if (productIndex === -1) {
      return set(({ cart: [...cart, product] }))
    }

    // update quantity if product exist
    const newCart = [...cart]
    newCart[productIndex].quantity = product.quantity
    set(({ cart: newCart }))
  },
  changeQuantityProduct: (product, quantity) => {
    const { cart } = get()

    const newCart = cart.map(item => {
      if (item.id === product.id && item.size === product.size)
        return { ...item, quantity }
      return item
    })

    set({ cart: newCart })
  },
  removeProductToCart: (product) => {
    const { cart } = get()
    const newCart = cart.filter(
      item => item.id !== product.id || item.size !== product.size
    )
    set({ cart: newCart })
  }
})

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      initializer,
      { name: 'shopping-cart', skipHydration: true }
    ),
    { name: 'shopping-cart' }
  )
)
