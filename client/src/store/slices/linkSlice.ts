import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShortUrl } from "@/types";

interface LinksState {
  links: ShortUrl[];
}

const initialState: LinksState = {
  links: [],
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLink: (state, action: PayloadAction<ShortUrl>) => {
      state.links.unshift(action.payload);
    },
    setLink: (state, action: PayloadAction<ShortUrl[]>) => {
      state.links = action.payload;
    },
  },
});

export const { addLink, setLink } = linksSlice.actions;
export default linksSlice.reducer;
