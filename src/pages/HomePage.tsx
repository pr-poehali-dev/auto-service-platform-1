import { useState } from 'react';
import Icon from '@/components/ui/icon';

const VIN_API_URL = 'https://functions.poehali.dev/d68df87f-00cc-4e9a-9bc4-3f50cc2ea69c';

interface HomePageProps {
  setActivePage: (page: string) => void;
  addToGarage: (car: { make: string; model: string; year: number; vin: string }) => void;
}

interface VinResult {
  vin: string;
  make: string;
  model: string;
  year: string;
  body_class: string;
  series: string;
  trim: string;
  engine_cylinders: string;
  displacement: string;
  fuel_type: string;
  drive_type: string;
  transmission: string;
  plant_country: string;
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

const specLabels: { key: keyof VinResult; label: string }[] = [
  { key: 'year', label: 'Год' },
  { key: 'body_class', label: 'Кузов' },
  { key: 'displacement', label: 'Объём (л)' },
  { key: 'engine_cylinders', label: 'Цилиндры' },
  { key: 'fuel_type', label: 'Топливо' },
  { key: 'drive_type', label: 'Привод' },
  { key: 'transmission', label: 'КПП' },
  { key: 'plant_country', label: 'Страна сборки' },
];

export default function HomePage({ setActivePage, addToGarage }: HomePageProps) {
  const [vinInput, setVinInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [vinResult, setVinResult] = useState<VinResult | null>(null);

  const handleVinSearch = async () => {
    const vin = vinInput.trim().toUpperCase();
    if (vin.length !== 17) {
      setError('VIN-код должен содержать ровно 17 символов');
      return;
    }
    setLoading(true);
    setError('');
    setVinResult(null);
    try {
      const resp = await fetch(`${VIN_API_URL}?vin=${encodeURIComponent(vin)}`);
      const data = await resp.json();
      if (!resp.ok || !data.success) {
        setError(data.error || 'Не удалось определить автомобиль');
      } else {
        setVinResult(data.car);
      }
    } catch {
      setError('Ошибка соединения. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleVinSearch();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').trim().toUpperCase().replace(/\s/g, '');
    if (text.length === 17) {
      e.preventDefault();
      setVinInput(text);
      setError('');
    }
  };

  const handleAddToGarage = () => {
    if (!vinResult) return;
    addToGarage({
      make: vinResult.make,
      model: vinResult.model,
      year: parseInt(vinResult.year) || 0,
      vin: vinResult.vin,
    });
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in max-w-5xl">
      {/* Hero search */}
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-1 tracking-wide">
          Найдём нужную<br />
          <span className="text-primary">деталь за минуту</span>
        </h1>
        <p className="text-muted-foreground mb-6">Введите VIN-код — определим автомобиль и подберём совместимые запчасти</p>

        <div className="bg-card border border-border rounded-xl p-5">
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-display mb-3 block">
            VIN-код автомобиля
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={vinInput}
                onChange={(e) => {
                  setVinInput(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, ''));
                  setError('');
                  setVinResult(null);
                }}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder="Например: 1HGBH41JXMN109186"
                className={`w-full bg-secondary border rounded-lg px-4 py-3 text-sm font-mono tracking-widest text-foreground placeholder:text-muted-foreground placeholder:tracking-normal placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  error ? 'border-destructive/60' : 'border-border focus:border-primary'
                }`}
                maxLength={17}
              />
              {vinInput && (
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono ${vinInput.length === 17 ? 'text-green-400' : 'text-muted-foreground'}`}>
                  {vinInput.length}/17
                </span>
              )}
            </div>
            <button
              onClick={handleVinSearch}
              disabled={loading || vinInput.length !== 17}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 min-w-[100px] justify-center"
            >
              {loading ? (
                <>
                  <Icon name="Loader" size={16} className="animate-spin" />
                  Ищу...
                </>
              ) : (
                <>
                  <Icon name="Search" size={16} />
                  Найти
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-3 flex items-center gap-2 text-destructive text-sm animate-fade-in">
              <Icon name="AlertCircle" size={14} />
              {error}
            </div>
          )}

          {vinResult && (
            <div className="mt-4 animate-fade-in">
              {/* Car name */}
              <div className="flex items-start justify-between gap-4 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="CheckCircle" size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-xl tracking-wide">
                      {vinResult.make} {vinResult.model}
                      {vinResult.series ? ` ${vinResult.series}` : ''}
                      {vinResult.trim ? ` · ${vinResult.trim}` : ''}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">{vinResult.vin}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={handleAddToGarage}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  >
                    <Icon name="Car" size={13} />
                    В гараж
                  </button>
                  <button
                    onClick={() => setActivePage('catalog')}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
                  >
                    <Icon name="Package" size={13} />
                    Запчасти
                  </button>
                </div>
              </div>

              {/* Specs grid */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {specLabels.map(({ key, label }) => {
                  const val = vinResult[key];
                  if (!val) return null;
                  return (
                    <div key={key} className="bg-secondary rounded-lg px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground mt-0.5 truncate">{val}</p>
                    </div>
                  );
                })}
              </div>
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