import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Router>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID || ''}>
        <App />
      </GoogleOAuthProvider>
    </Router>
);