import { PayloadAction, Reducer as ReduxReducer } from "@reduxjs/toolkit";

export type Reducer<State, Payload> = ReduxReducer<State, PayloadAction<Payload>>
