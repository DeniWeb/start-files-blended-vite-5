import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeInfo,
  fetchLatestSymbols,
} from './operations';

const initialState = {
  baseCurrency: '',
  isLoading: false,
  error: null,
  exchangeInfo: null,
  rates: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,

  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })

      .addCase(fetchExchangeInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExchangeInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.exchangeInfo = payload;
      })
      .addCase(fetchExchangeInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.exchangeInfo = null;
      })

      .addCase(fetchLatestSymbols.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLatestSymbols.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.rates = payload;
      })
      .addCase(fetchLatestSymbols.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.rates = [];
      });
  },
});

export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
