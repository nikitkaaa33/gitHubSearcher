import { TypedUseSelectorHook } from "react-redux/es/types";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
