import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
    showSideBar: boolean;
}

const initialState: SidebarState = {
    showSideBar: false,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setShowSidebar:(state,action)=>{
            state.showSideBar = action.payload
        }
    },
});

export const { setShowSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;