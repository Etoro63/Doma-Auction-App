import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Buffer } from "buffer";
import process from "process";

window.global = window;
window.Buffer = Buffer;
window.process = process;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
