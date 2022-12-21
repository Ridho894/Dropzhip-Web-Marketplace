import { RootState } from "@/redux/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Picture = {
  photo: string;
}

const initialState: Picture = {
  photo: "",
}

export const pictureSlice = createSlice({
  name: "picture",
  initialState,
  reducers: {
    addPicture: (state: Picture, action: PayloadAction<string>) => {
      state.photo = action.payload
    },
    removePicture: (state: Picture) => {
      Object.assign(state, initialState)
    }
  }
})

export const { addPicture, removePicture } = pictureSlice.actions
export const getPicture = (state: RootState) => state.picture.photo
export default pictureSlice.reducer
