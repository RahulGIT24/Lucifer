import { IMessage } from "@/models/MessageModel";
import { createSlice } from "@reduxjs/toolkit";

export interface ChatSessionInterface {
  chatSessionId: null | string;
  messages:IMessage[];
}

const initialState: ChatSessionInterface = {
  chatSessionId: null,
  messages:[],
};

export const chatSlice = createSlice({
  name: "chatslice",
  initialState,
  reducers: {
    setChatSessionId: (state, action) => {
      state.chatSessionId = action.payload;
    },
    setMessages:(state,action)=>{
      state.messages = action.payload
    },
  },
});

export const { setChatSessionId,setMessages } = chatSlice.actions;

export default chatSlice.reducer;
