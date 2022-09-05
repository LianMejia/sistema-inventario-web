import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { AppRouter } from "./router/AppRouter";

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>
)