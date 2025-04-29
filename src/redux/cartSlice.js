import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: [] },
    reducers: {
        addToCart: (state, { payload }) => {

            //payload olarak gelen üürün sepette zaten var mı?
            const foundItem = state.cart.find(
                (item) =>
                    item.id === payload.item.id && item.type === payload.selectedType
            );

            if (foundItem) {
                //eğer sepette aynı elemanda varsa miktarını artırır
                foundItem.amount++;
            }
            if (false) {
                //eğer sepette aynı elemandan varsa miktarını artıt

            } else {
                //eğer sepette aynı elemandan yoksa sepete ekle
                state.cart.push({
                    ...payload.item,
                    type: payload.selectedType,
                    amount: 1,
                });
                console.log(payload);
            }
        },
        deleteFromCart: (state, { payload }) => {
            const index = state.cart.findIndex(
                (item) => item.id == payload.id && item.type == payload.type
            );
            if (state.cart[index].amount > 1) {
                //eğer miktarı 1den fazla ise miktarı azalt
                state.cart[index].amount--;
            } else {
                // eğer miktarı 1 eşit ise ürünü kaldır
                state.cart.splice(index, 1);
            }
        },
        createOrder: (state) => {
            state.cart = []
        }
    },
});

export const { addToCart, deleteFromCart, createOrder } = cartSlice.actions;

export default cartSlice.reducer;