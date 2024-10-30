import { configureStore } from '@reduxjs/toolkit'; 
import authReducer from './Slices/AuthSlice';
import sidebarSlice from './Slices/SideBarSlice';
import DasboardSlice from './Slices/DasboardSlice';
import BOMModalSlice from './Slices/BOMModalSlice';
import ItemSlice from './Slices/ItemSlice';
import BOMTableSlice from './Slices/BOMTableSlice';
import AuthMiddleware from './Middleware/AuthMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarSlice,
    dashboard: DasboardSlice,
    bomModal: BOMModalSlice,
    item: ItemSlice,
    bom: BOMTableSlice
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(AuthMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
