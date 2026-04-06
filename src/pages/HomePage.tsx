import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  setActivePage: (page: string) => void;
}

const quickActions = [
  { icon: 'Package', label: 'Каталог запчастей', desc: 'Поиск по марке и модели', page: 'catalog', color: 'text-blue-400' },
  { icon: 'Car', label: 'Мой гараж', desc: 'Сохранённые автомобили', page: 'garage', color: 'text-green-400' },
  { icon: 'ClipboardList', label: 'Мои заказы', desc: 'История и статусы', page: 'orders', color: 'text-yellow-400' },
  { icon: 'MapPin', label: 'О мастерской', desc: 'Адрес и контакты', page: 'about', color: 'text-primary' },
];

const popularParts = [
  { name: 'Тормозные колодки', art: 'TRW GDB3392', price: '2 490 ₽', brand: 'Toyota', inStock: true },
  { name: 'Масляный фильтр', art: 'MANN W712/73', price: '890 ₽', brand: 'BMW', inStock: true },
  { name: 'Воздушный фильтр', art: 'FILTRON AP139/1', price: '1 290 ₽', brand: 'Volkswagen', inStock: false },
  { name: 'Свечи зажигания', art: 'NGK BKR6EK', price: '3 200 ₽', brand: 'Honda', inStock: true },
];

export default function HomePage({ setActivePage }: HomePageProps) {
  const [vinInput, setVinInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [vinResult, setVinResult] = useState<null | { make: string; model: string; year: string }>(null);

  const handleVinSearch = () => {
    if (vinInput.length < 6) return;
    setVinResult({ make: 'Toyota', model: 'Camry', year: '2019' });
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setVinInput('1HGBH41JXMN109186');
    }, 1800);
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in max-w-5xl">
      {/* Hero search */}
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-1 tracking-wide">
          Найдём нужную<br />
          <span className="text-primary">деталь за минуту</span>
        </h1>
        <p className="text-muted-foreground mb-6">Введите VIN-код — и мы подберём все совместимые запчасти</p>

        <div className="bg-card border border-border rounded-xl p-5">
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-display mb-3 block">
            VIN-код автомобиля
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={vinInput}
                onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                placeholder="Например: 1HGBH41JXMN109186"
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-mono tracking-widest text-foreground placeholder:text-muted-foreground placeholder:tracking-normal placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                maxLength={17}
              />
              {vinInput && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {vinInput.length}/17
                </span>
              )}
            </div>
            <button
              onClick={handleScan}
              className={`px-4 py-3 rounded-lg border border-border bg-secondary hover:bg-muted hover:border-primary transition-all flex items-center gap-2 text-sm ${scanning ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Camera" size={16} className={scanning ? 'animate-pulse' : ''} />
              <span className="hidden sm:block">{scanning ? 'Сканирую...' : 'Сканировать'}</span>
            </button>
            <button
              onClick={handleVinSearch}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <Icon name="Search" size={16} />
              Найти
            </button>
          </div>

          {vinResult && (
            <div className="mt-4 flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 animate-fade-in">
              <Icon name="CheckCircle" size={18} className="text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{vinResult.make} {vinResult.model} {vinResult.year}</p>
                <p className="text-xs text-muted-foreground">Автомобиль найден — показываем совместимые запчасти</p>
              </div>
              <button
                onClick={() => setActivePage('catalog')}
                className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"
              >
                Перейти в каталог <Icon name="ArrowRight" size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-lg font-semibold text-muted-foreground uppercase tracking-widest mb-4">Быстрый доступ</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.page}
              onClick={() => setActivePage(action.page)}
              className="bg-card border border-border rounded-xl p-4 text-left hover-scale group transition-all hover:border-primary/40"
            >
              <div className={`mb-3 ${action.color}`}>
                <Icon name={action.icon} size={24} />
              </div>
              <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{action.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Popular parts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-muted-foreground uppercase tracking-widest">Популярные товары</h2>
          <button onClick={() => setActivePage('catalog')} className="text-xs text-primary hover:underline flex items-center gap-1">
            Все товары <Icon name="ArrowRight" size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularParts.map((part, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/40 transition-all hover-scale">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Package" size={20} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{part.name}</p>
                <p className="text-xs text-muted-foreground">{part.art} · {part.brand}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-foreground text-sm">{part.price}</p>
                <p className={`text-xs mt-0.5 ${part.inStock ? 'text-green-400' : 'text-red-400'}`}>
                  {part.inStock ? 'В наличии' : 'Под заказ'}
                </p>
              </div>
              <button className="p-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all flex-shrink-0">
                <Icon name="Plus" size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
