import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AddressStore as Address } from '@/interfaces/address-store.interface'

interface State {
  address: Address
}

interface Actions {
  setAddress: (address: Address) => void;
}

const initialState: State = {
  address: {
    address: '',
    address2: '',
    city: '',
    country: '',
    lastName: '',
    names: '',
    phoneNumber: '',
    postalCode: ''
  }
}

type AddressStore = State & Actions;
type AddressStateCreator = StateCreator<AddressStore, [["zustand/devtools", never], ["zustand/persist", unknown]]>

const initializer: AddressStateCreator = (set) => ({
  address: initialState.address,
  setAddress: (address) => {
    set({ address })
  },
})

export const useAddressStore = create<AddressStore>()(
  devtools(
    persist(
      initializer,
      { name: 'delivery-address' }
    ),
    { name: 'delivery-address' }
  )
)
