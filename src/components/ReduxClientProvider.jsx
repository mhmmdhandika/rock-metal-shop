"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";

export default function ReduxClientProvider({ children }) { 
  return <Provider store={store}>{children}</Provider>;
}
