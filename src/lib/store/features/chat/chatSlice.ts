import { IMessage } from "@/models/MessageModel";
import { createSlice } from "@reduxjs/toolkit";

export interface ChatSessionInterface {
  chatSessionId: null | string;
  currentPrompt: string;
  messages:IMessage[];
}

const initialState: ChatSessionInterface = {
  chatSessionId: null,
  currentPrompt: "",
  messages:[],
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
    setMessages:(state,action)=>{
      state.messages = action.payload
    },
  },
});

export const { setChatSessionId, setCurrentPrompt,setMessages } = chatSlice.actions;

export default chatSlice.reducer;
