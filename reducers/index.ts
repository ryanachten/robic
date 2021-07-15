import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import { rootSaga } from "../sagas";
// import { authReducer } from "./auth.reducer";
import { exerciseDefinitionReducer } from "./exerciseDefinition.reducer";
// import { userReducer } from "./user.reducer";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    exerciseDefinition: exerciseDefinitionReducer,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

// sagaMiddleWare.run(rootSaga);

export const action = (type: string) => store.dispatch({ type });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
