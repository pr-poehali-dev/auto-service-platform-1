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

export interface GarageCar {
  id: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  mileage: number;
  plate: string;
  color: string;
}

const initialCars: GarageCar[] = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2019, vin: '1HGBH41JXMN109186', mileage: 67000, plate: 'А123БВ77', color: '#c0392b' },
  { id: 2, make: 'BMW', model: '3 Series', year: 2021, vin: 'WBADE5321VBW51554', mileage: 32000, plate: 'В456ГД77', color: '#2c3e50' },
];

const COLORS = ['#e67e22', '#2980b9', '#27ae60', '#8e44ad', '#e74c3c', '#16a085', '#2c3e50', '#f39c12'];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cartCount] = useState(2);
  const [notifCount] = useState(2);
  const [garageCars, setGarageCars] = useState<GarageCar[]>(initialCars);

  const addToGarage = (car: Omit<GarageCar, 'id' | 'mileage' | 'plate' | 'color'>) => {
    const alreadyExists = garageCars.some((c) => c.vin === car.vin);
    if (alreadyExists) {
      setActivePage('garage');
      return;
    }
    const color = COLORS[garageCars.length % COLORS.length];
    setGarageCars((prev) => [
      ...prev,
      { ...car, id: Date.now(), mileage: 0, plate: '', color },
    ]);
    setActivePage('garage');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setActivePage={setActivePage} addToGarage={addToGarage} />;
      case 'catalog': return <CatalogPage />;
      case 'garage': return <GaragePage setActivePage={setActivePage} cars={garageCars} setCars={setGarageCars} />;
      case 'orders': return <OrdersPage />;
      case 'cart': return <CartPage />;
      case 'profile': return <ProfilePage />;
      case 'about': return <AboutPage />;
      default: return <HomePage setActivePage={setActivePage} addToGarage={addToGarage} />;
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
