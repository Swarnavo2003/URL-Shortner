import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import type { RootState, AppDispatch, store } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<typeof store>();
