import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';

function App(){
    return(
        <h1>Hola Mundo</h1>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)