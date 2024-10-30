import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 


interface DashboardState {
  cards: Array<{
    title: string;
    content: string;
    bgColor: string;
    linkTo: string;

  }>;
}

const initialState: DashboardState = {
  cards: [
    {
      title: "Planning Control",
      content: "",
      bgColor: "bg-teal-500",
      linkTo: "/listscd",

    },
    {
      title: "Exchange Rates",
      content: "Exchange Rates",
      bgColor: "bg-green-500",
      linkTo: "/bommodal",
    },
    {
      title: "Requisitions",
      content: "Requisitions",
      bgColor: "bg-yellow-500",
      linkTo: "/summary",

    },
    {
      title: "CARs",
      content: "Capital Appropriation Request",
      bgColor: "bg-red-500",
      linkTo: "/summary",

    },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateCard: (state, action: PayloadAction<{ index: number; card: DashboardState['cards'][number] }>) => {
      state.cards[action.payload.index] = action.payload.card;
    },
  },
});

export const { updateCard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
