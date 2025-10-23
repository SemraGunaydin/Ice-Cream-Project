import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      //sepette ayni urun varmi
      const found = state.cart.find(
        (item) =>
          item.id === payload.item.id && item.type === payload.selectedType
      );

      if (found) {
        //eger sepette ayni ureunden varsa miktarini arttit
        found.amount++;
      } else {
        // eger yoksa yeni urun sepete ekle
        state.cart.push({
          ...payload.item,
          type: payload.selectedType,
          amount: 1,
        });
      }
    },
    deleteFromCart: (state, { payload }) => {
      //sepetteki urunu bul
      const index = state.cart.findIndex(
        (item) => item.id === payload.id && item.type === payload.type
      );

      if (state.cart[index].amount > 1) {
        // eger miktari 1'den fazlaysa miktarini azalt
        state.cart[index].amount--;
      } else {
        // eger miktari 1 ise urunu kaldir
        state.cart.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
