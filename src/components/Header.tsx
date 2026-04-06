import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  cartCount: number;
  notifCount: number;
}

export default function Header({ activePage, setActivePage, cartCount, notifCount }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSearchValue('1HGBH41JXMN109186');
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-4 px-6 h-16">
        {/* Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Icon name="Wrench" size={16} className="text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground tracking-wide">
            ta-dam<span className="text-primary">!</span>
          </span>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Icon name="Search" size={16} className="absolute left-3 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Введите VIN-код, артикул или название детали..."
              className="w-full bg-secondary border border-border rounded-lg pl-9 pr-12 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              onClick={handleScan}
              className={`absolute right-2 p-1.5 rounded-md transition-all ${scanning ? 'text-primary animate-pulse' : 'text-muted-foreground hover:text-primary hover:bg-muted'}`}
              title="Сканировать VIN через камеру"
            >
              <Icon name="Camera" size={16} />
            </button>
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center gap-1">
          <NavBtn
            icon="Bell"
            label="Профиль"
            badge={notifCount}
            active={activePage === 'profile'}
            onClick={() => setActivePage('profile')}
          />
          <NavBtn
            icon="ClipboardList"
            label="Заказы"
            active={activePage === 'orders'}
            onClick={() => setActivePage('orders')}
          />
          <NavBtn
            icon="ShoppingCart"
            label="Корзина"
            badge={cartCount}
            active={activePage === 'cart'}
            onClick={() => setActivePage('cart')}
          />
        </div>
      </div>
    </header>
  );
}

function NavBtn({ icon, label, badge, active, onClick }: {
  icon: string;
  label: string;
  badge?: number;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all text-xs font-medium ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      }`}
    >
      <Icon name={icon} size={18} />
      <span className="hidden sm:block">{label}</span>
      {badge != null && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}
