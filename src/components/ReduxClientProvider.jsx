"use client";

import { Provider } from "react-redux";
import store from "@/redux/store/configureStore";

export default function ReduxClientProvider({ children }) { 
  return <Provider store={store}>{children}</Provider>;
}
