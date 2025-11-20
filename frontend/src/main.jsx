// frontend/src/main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';   // named import

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
