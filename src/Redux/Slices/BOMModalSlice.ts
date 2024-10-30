import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 

interface BOMModalState {
  isVisible: boolean;
  itemNumber: string;
  dateSelected: string;
}

const initialState: BOMModalState = {
  isVisible: false,
  itemNumber: '',
  dateSelected: '',
};

const bomModalSlice = createSlice({
  name: 'bomModal',
  initialState,
  reducers: {
    openModal(state) {
      state.isVisible = true;
    },
    closeModal(state) {
      state.isVisible = false;
    },
    setBOMData(state, action: PayloadAction<{ itemNumber: string; dateSelected: string }>) {
      state.itemNumber = action.payload.itemNumber;
      state.dateSelected = action.payload.dateSelected;
    },
  },
});

export const { openModal, closeModal, setBOMData } = bomModalSlice.actions;

export default bomModalSlice.reducer;
