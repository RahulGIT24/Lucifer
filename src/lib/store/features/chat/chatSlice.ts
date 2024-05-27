import { IMessage } from "@/models/MessageModel";
import { createSlice } from "@reduxjs/toolkit";

export interface ChatSessionInterface {
  chatSessionId: null | string;
  currentPrompt: string;
  messages:IMessage[];
  messageFlag:boolean
}

const initialState: ChatSessionInterface = {
  chatSessionId: null,
  currentPrompt: "",
  messages:[],
  messageFlag:false
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
    setMessageFlag:(state,action)=>{
      state.messageFlag = action.payload
    }
  },
});

export const { setChatSessionId, setCurrentPrompt,setMessages,setMessageFlag } = chatSlice.actions;

export default chatSlice.reducer;
