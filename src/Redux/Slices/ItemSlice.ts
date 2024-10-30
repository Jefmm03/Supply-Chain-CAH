
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import { ItemMasterDto } from '../../types/Types';

interface ItemState {
  items: ItemMasterDto[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await fetch('https://localhost:7290/api/itemmaster/filtered-items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching items');
  }
  const data: ItemMasterDto[] = await response.json();
  return data;
});

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching items';
      });
  },
});

export default itemSlice.reducer;
