import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware';

interface State {
  isSideMenuOpen: boolean;
}

interface Actions {
  toggleSideMenu: () => void
}

type UiStore = State & Actions;

const initializer: StateCreator<UiStore> = (set) => ({
  isSideMenuOpen: false,
  toggleSideMenu: () => set(state => ({ isSideMenuOpen: !state.isSideMenuOpen }))
})

export const useUiStore = create<UiStore>()(
  devtools(initializer, { name: 'ui' })
)
