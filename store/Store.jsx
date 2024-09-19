import { configureStore } from '@reduxjs/toolkit'
import LoginSlicer from './Slicers/LoginSlicer'
import ProductSlicer from './Slicers/Products'
import CardSlicer from './Slicers/CardSlicer'
import SwitchState from './Slicers/SwitchState'

export const Store = configureStore({
  reducer: {
    LoginSlicer,
    ProductSlicer,
    CardSlicer,
    SwitchState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})