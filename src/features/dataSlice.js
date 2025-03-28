import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products?limit=194");
      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
