import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BOMData } from '../../types/Types'; 

interface BOMState {
  bomData: BOMData[];
  loading: boolean;
  error: string | null;
}

const initialState: BOMState = {
  bomData: [],
  loading: false,
  error: null,
};

export const fetchBOMData = createAsyncThunk(
  'bom/fetchBOMData',
  async ({ itemNumber, dateSelected }: { itemNumber: string; dateSelected: string }) => {
    const response = await fetch(
      `https://localhost:7290/api/BOM/GetBOM?itemNumber=${itemNumber}&dateSelected=${dateSelected}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error retrieving BOM data');
    }

    const data: BOMData[] = await response.json();
    return data;
  }
);

export const bomSlice = createSlice({
  name: 'bom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBOMData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBOMData.fulfilled, (state, action) => {
        state.loading = false;
        state.bomData = action.payload;
      })
      .addCase(fetchBOMData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching BOM data';
      });
  },
});

export default bomSlice.reducer;
