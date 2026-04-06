import Icon from '@/components/ui/icon';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const navItems = [
  { id: 'home', icon: 'Home', label: 'Главная' },
  { id: 'catalog', icon: 'Package', label: 'Каталог' },
  { id: 'garage', icon: 'Car', label: 'Гараж' },
  { id: 'orders', icon: 'ClipboardList', label: 'Заказы' },
  { id: 'cart', icon: 'ShoppingCart', label: 'Корзина' },
  { id: 'profile', icon: 'User', label: 'Профиль' },
  { id: 'about', icon: 'MapPin', label: 'О нас' },
];

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className="w-56 flex-shrink-0 border-r border-border bg-sidebar min-h-[calc(100vh-4rem)]">
      {/* Stats */}
      <div className="p-4 border-b border-border">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 font-display">Сегодня</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Выручка</span>
            <span className="text-sm font-semibold text-foreground">0 ₽</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Прибыль</span>
            <span className="text-sm font-semibold text-primary">0 ₽</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all ${
              activePage === item.id
                ? 'bg-primary text-primary-foreground glow-orange'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground'
            }`}
          >
            <Icon name={item.icon} size={17} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
