import { createReducer, on } from "@ngrx/store";
import { increment, dataModify } from "./counter.actions";

export const initialState = 0;
export const data = 'snehal';

export const counterReducer = createReducer(
    initialState,
    on(increment, (state) => state+1)
);

export const dataShareReducer = createReducer(
    data,
    on(dataModify, (state) => state.replace('s','S'))
)