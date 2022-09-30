import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from './core/provider/user';
import PaymentView from './views/Payment';
import SubscriptionsView from './views/Subscriptions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
    <Routes>
      <Route path="/subscriptions" element={<SubscriptionsView />} />
      <Route path="payment" element={<PaymentView />} />
    </Routes>
  </BrowserRouter>
);