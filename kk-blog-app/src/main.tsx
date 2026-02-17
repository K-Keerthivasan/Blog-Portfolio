import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {HelmetProvider} from 'react-helmet-async';

// main.tsx or index.tsx
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/fira-mono/400.css"; // Regular weight
import "@fontsource/fira-mono/700.css"; // Bold weight (optional)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <App/>
        </HelmetProvider>
    </StrictMode>,
)


