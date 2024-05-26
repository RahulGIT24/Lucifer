import { createSlice } from "@reduxjs/toolkit";

export interface ChatSessionInterface {
  chatSessionId: null | string;
  currentPrompt: string;
}

const initialState: ChatSessionInterface = {
  chatSessionId: null,
  currentPrompt: "",
};

export const chatSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setChatSessionId: (state, action) => {
      state.chatSessionId = action.payload;
    },
    setCurrentPrompt: (state, action) => {
      state.currentPrompt = action.payload;
    },
  },
});

export const { setChatSessionId, setCurrentPrompt } = chatSlice.actions;

export default chatSlice.reducer;
