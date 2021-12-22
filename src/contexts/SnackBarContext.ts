import { createContext } from "react";

export const SnackBarContext = createContext({
    visible: false,
    message: "",
});
