import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    outOfStockProducts: [],
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        addOutOfStockProduct: (state, action) => {
            console.log("-->", action.payload);

            action.payload.forEach(productId => {
                if (!state.outOfStockProducts.includes(productId)) {
                    state.outOfStockProducts.push(productId);
                }
            });

            console.log("-->", state.outOfStockProducts);
        },
    }
});

const selectOutOfStockProducts = (state) => state.auth.outOfStockProducts;

export const getOutOfStockProducts = createSelector(
    [selectOutOfStockProducts],
    (outOfStockProducts) => outOfStockProducts // Return the product IDs directly
);

export const { login, logout, addOutOfStockProduct } = authSlice.actions;
export default authSlice.reducer;
