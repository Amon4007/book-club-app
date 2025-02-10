import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();