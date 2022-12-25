import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Basket = {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: string;
  image: string;
  free_delivery: boolean;
  rating: number;
  slug: string;
}

interface CounterState {
  items: Basket[];
}

const initialState: CounterState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket(state: CounterState, action: PayloadAction<Basket>) {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket(state: CounterState, action: PayloadAction<number>) {
      state.items = [
        ...state.items.filter((_, index) => index !== action.payload),
      ];
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState) => state.basket.items;
export const selectTotal = (state: RootState) => state.basket.items.reduce((total, i) => total + i.price, 0)

export default basketSlice.reducer;
