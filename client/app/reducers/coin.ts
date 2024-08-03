
import { getCoinEntriesByCode, getCoins } from '../services';
import { CoinModal, CoinEntryModal } from '../utils/modals';
import {createSlice} from '@reduxjs/toolkit'

interface CoinInitialStateType {
  coins: null | CoinModal [];
  coinsLoading: boolean;
  coinDetails: null | CoinModal;
  coinDetailsLoading: boolean;
  coinEntries: null | CoinEntryModal[];
  coinEntriesLoading: boolean;
  error: boolean
} 


const initialState: CoinInitialStateType = {
  coins: null,
  coinsLoading: false,
  coinDetails: null,
  coinDetailsLoading: false,
  coinEntries: null,
  coinEntriesLoading: false,
  error: false
}


const CoinSlice = createSlice({
  name: "CoinSlice", //must be unique for every slice. convention is to put the same as file name
  initialState, //the initial state of the slice
  reducers: {
    setCoinDetails: (state, action) => {
      state.coinDetails = action.payload
    },
  }, // action methods
  extraReducers: (builder) => {
    builder.addCase('RESET_STATE', () => initialState);

    builder.addCase(getCoins.pending, (state) => {
      state.coinsLoading = true
    })
    builder.addCase(getCoins.fulfilled, (state, action) => {
      state.coins = action.payload
      state.coinsLoading = false
    })
    builder.addCase(getCoins.rejected, (state, action) => {
      state.error = true
      state.coinsLoading = false
    })

    builder.addCase(getCoinEntriesByCode.pending, (state) => {
      state.coinEntriesLoading = true
    })
    builder.addCase(getCoinEntriesByCode.fulfilled, (state, action) => {
      state.coinEntries = action.payload
      state.coinEntriesLoading = false
    })
    builder.addCase(getCoinEntriesByCode.rejected, (state, action) => {
      state.error = true
      state.coinEntriesLoading = false
    })
  }
})

export const CoinActions = {
   ...CoinSlice.actions, //This includes all the action methods written above
}

export const CoinReducer = CoinSlice.reducer //This is stored in the main store
