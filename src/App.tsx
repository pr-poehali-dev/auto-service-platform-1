import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import GaragePage from '@/pages/GaragePage';
import OrdersPage from '@/pages/OrdersPage';
import CartPage from '@/pages/CartPage';
import ProfilePage from '@/pages/ProfilePage';
import AboutPage from '@/pages/AboutPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cartCount] = useState(2);
  const [notifCount] = useState(2);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setActivePage={setActivePage} />;
      case 'catalog': return <CatalogPage />;
      case 'garage': return <GaragePage setActivePage={setActivePage} />;
      case 'orders': return <OrdersPage />;
      case 'cart': return <CartPage />;
      case 'profile': return <ProfilePage />;
      case 'about': return <AboutPage />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster />
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartCount}
        notifCount={notifCount}
      />
      <div className="flex flex-1">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
