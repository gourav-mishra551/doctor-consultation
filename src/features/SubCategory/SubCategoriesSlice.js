import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoryIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategoryIdSuccess(state, action) {
      state.loading = false;
      state.categoryId = action.payload;
    },
    fetchCategoryIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCategoryIdStart, fetchCategoryIdSuccess, fetchCategoryIdFailure } = categorySlice.actions;

export default categorySlice.reducer;