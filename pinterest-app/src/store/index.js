import { configureStore } from "@reduxjs/toolkit"
import pictures from "./slices/pictures"

export const store = configureStore({
    reducer: {
        pictures
    }
})