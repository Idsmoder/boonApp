import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Token, URL } from "../../api/const";


export const getLimitData = createAsyncThunk('getLimitData', async () => {
  const res = await axios(`${URL}/application/last`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
  return res.data
})

const ProductSlicer = createSlice({
  name: "product",
  initialState: {
    basket: [
      {
        product: "Samsung S23 Ultra 12/256GB",
        product_unique_id: null,
        count: 1,
        purchase_price: "10000000.00",
        sale_price: "15400000",
        product_category_name: "Общая"
      },
      {
        product: "iPhone 14 Pro Max 128GB",
        product_unique_id: null,
        count: 2,
        purchase_price: "12000000.00",
        sale_price: "17000000",
        product_category_name: "Смартфоны"
      },
      {
        product: "MacBook Pro 16\" M1",
        product_unique_id: null,
        count: 3,
        purchase_price: "25000000.00",
        sale_price: "32000000",
        product_category_name: "Ноутбуки"
      },
      {
        product: "Sony WH-1000XM4",
        product_unique_id: null,
        count: 5,
        purchase_price: "5000000.00",
        sale_price: "7500000",
        product_category_name: "Наушники"
      },
      {
        product: "Apple Watch Series 8",
        product_unique_id: null,
        count: 4,
        purchase_price: "8000000.00",
        sale_price: "11000000",
        product_category_name: "Часы"
      },
      {
        product: "Google Pixel 7 Pro",
        product_unique_id: null,
        count: 2,
        purchase_price: "15000000.00",
        sale_price: "20000000",
        product_category_name: "Смартфоны"
      },
      {
        product: "Dell XPS 13",
        product_unique_id: null,
        count: 6,
        purchase_price: "20000000.00",
        sale_price: "25000000",
        product_category_name: "Ноутбуки"
      },
      {
        product: "Bose QuietComfort 35 II",
        product_unique_id: null,
        count: 3,
        purchase_price: "6000000.00",
        sale_price: "8500000",
        product_category_name: "Наушники"
      },
      {
        product: "HP Spectre x360",
        product_unique_id: null,
        count: 1,
        purchase_price: "22000000.00",
        sale_price: "29000000",
        product_category_name: "Ноутбуки"
      },
      {
        product: "Samsung Galaxy Tab S8",
        product_unique_id: null,
        count: 4,
        purchase_price: "12000000.00",
        sale_price: "15000000",
        product_category_name: "Планшеты"
      }
    ],
    isFetching: false,
    error: null,
    limitData: [],
    isLoading: false
  },
  reducers: {
    setProducts(state, action) {
      state.basket = action.payload;
    },
    setFetching(state, action) {
      state.isFetching = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLimitData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getLimitData.fulfilled, (state, action) => {
      state.isLoading = false
      state.limitData = action.payload
    })
    builder.addCase(getLimitData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const { setProducts, setFetching, setError } = ProductSlicer.actions;

export default ProductSlicer.reducer;