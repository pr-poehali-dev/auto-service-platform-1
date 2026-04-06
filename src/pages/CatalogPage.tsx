import { useState } from 'react';
import Icon from '@/components/ui/icon';

const makes = ['Toyota', 'BMW', 'Volkswagen', 'Honda', 'Hyundai', 'Kia', 'Mercedes', 'Audi', 'Lada'];
const categories = ['Тормозная система', 'Двигатель', 'Подвеска', 'Фильтры', 'Электрика', 'Кузов', 'Трансмиссия'];

const allParts = [
  { name: 'Тормозные колодки передние', art: 'TRW GDB3392', price: 2490, brand: 'Toyota', cat: 'Тормозная система', inStock: true, rating: 4.8 },
  { name: 'Масляный фильтр двигателя', art: 'MANN W712/73', price: 890, brand: 'BMW', cat: 'Фильтры', inStock: true, rating: 4.9 },
  { name: 'Воздушный фильтр салона', art: 'FILTRON AP139/1', price: 1290, brand: 'Volkswagen', cat: 'Фильтры', inStock: false, rating: 4.5 },
  { name: 'Свечи зажигания (4 шт)', art: 'NGK BKR6EK', price: 3200, brand: 'Honda', cat: 'Двигатель', inStock: true, rating: 4.7 },
  { name: 'Амортизатор передний', art: 'SACHS 312578', price: 6800, brand: 'Hyundai', cat: 'Подвеска', inStock: true, rating: 4.6 },
  { name: 'Ремень ГРМ', art: 'GATES T43102', price: 2100, brand: 'Kia', cat: 'Двигатель', inStock: false, rating: 4.4 },
  { name: 'Колодки тормозные задние', art: 'BREMBO P30042', price: 3100, brand: 'Mercedes', cat: 'Тормозная система', inStock: true, rating: 5.0 },
  { name: 'Топливный насос', art: 'BOSCH 0580314114', price: 8500, brand: 'Audi', cat: 'Двигатель', inStock: true, rating: 4.3 },
];

export default function CatalogPage() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [search, setSearch] = useState('');
  const [cartAdded, setCartAdded] = useState<Set<string>>(new Set());

  const filtered = allParts.filter((p) => {
    if (selectedMake && p.brand !== selectedMake) return false;
    if (selectedCat && p.cat !== selectedCat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.art.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToCart = (art: string) => {
    setCartAdded((prev) => new Set([...prev, art]));
  };

  return (
    <div className="p-6 animate-fade-in max-w-5xl">
      <h1 className="font-display text-3xl font-bold text-foreground tracking-wide mb-6">
        Каталог <span className="text-primary">запчастей</span>
      </h1>

      <div className="flex gap-5">
        {/* Filters */}
        <aside className="w-44 flex-shrink-0 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-display mb-2">Марка</p>
            <div className="space-y-0.5">
              {makes.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMake(selectedMake === m ? '' : m)}
                  className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-all ${
                    selectedMake === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-display mb-2">Категория</p>
            <div className="space-y-0.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCat(selectedCat === c ? '' : c)}
                  className={`w-full text-left text-xs px-2 py-1.5 rounded-md transition-all leading-tight ${
                    selectedCat === c ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {(selectedMake || selectedCat) && (
            <button
              onClick={() => { setSelectedMake(''); setSelectedCat(''); }}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <Icon name="X" size={12} /> Сбросить фильтры
            </button>
          )}
        </aside>

        {/* Parts list */}
        <div className="flex-1">
          <div className="relative mb-4">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по артикулу или названию..."
              className="w-full bg-secondary border border-border rounded-lg pl-8 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <p className="text-xs text-muted-foreground mb-3">Найдено: {filtered.length} позиций</p>

          <div className="space-y-2">
            {filtered.map((part) => (
              <div
                key={part.art}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/40 transition-all group"
              >
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Package" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{part.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground font-mono">{part.art}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-xs text-muted-foreground">{part.brand}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-xs text-muted-foreground">{part.cat}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="Star" size={10} className={i < Math.round(part.rating) ? 'text-primary' : 'text-muted'} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{part.rating}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-foreground">{part.price.toLocaleString('ru')} ₽</p>
                  <p className={`text-xs mt-0.5 ${part.inStock ? 'text-green-400' : 'text-yellow-400'}`}>
                    {part.inStock ? '✓ В наличии' : '⏱ Под заказ'}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(part.art)}
                  className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${
                    cartAdded.has(part.art)
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground'
                  }`}
                >
                  <Icon name={cartAdded.has(part.art) ? 'Check' : 'ShoppingCart'} size={16} />
                </button>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="PackageSearch" size={40} className="mx-auto mb-3 opacity-40" />
                <p>Ничего не найдено</p>
                <p className="text-sm mt-1">Попробуйте изменить фильтры или запрос</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
