import { create } from "zustand";

type MobileNavState = {
	open: boolean;
	setOpen: (open: boolean) => void;
	toggle: () => void;
	close: () => void;
};

/** Menu de navegação mobile (Sheet lateral): aberto pelo botão da navbar e fechado pelos links. */
export const useMobileNavStore = create<MobileNavState>()((set) => ({
	open: false,
	setOpen: (open) => set({ open }),
	toggle: () => set((state) => ({ open: !state.open })),
	close: () => set({ open: false }),
}));
