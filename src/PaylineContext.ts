import { createContext } from "react";

const PaylineContext = createContext<{isLoaded: boolean}>({isLoaded: false});

export default PaylineContext;