import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MyType = {
  numericValue: number;
  text: string;
};

type MyPayloadActionType = {
  increment: number;
};

const initialState: MyType = { numericValue: 10, text: 'lorem ipsum' };

function getInitialState() {
  return initialState;
}

const mySlice = createSlice({
  name: 'name-of-slice',
  initialState: getInitialState,
  reducers: {
    incrementBy1Reducer(state) {
      return { ...state, numericValue: state.numericValue + 1 };
    },
    incrementReducer(state, action) {
      return { ...state, numericValue: state.numericValue + action.payload };
    },
    incrementReducer2(state, action: PayloadAction<MyPayloadActionType>) {
      return {
        ...state,
        numericValue: state.numericValue + action.payload.increment,
      };
    },
  },
});

export const { incrementBy1Reducer, incrementReducer, incrementReducer2 } =
  mySlice.actions;
export const mySliceReducer = mySlice.reducer;
