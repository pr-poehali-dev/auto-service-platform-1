import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { GarageCar } from '@/App';

interface GaragePageProps {
  setActivePage: (page: string) => void;
  cars: GarageCar[];
  setCars: React.Dispatch<React.SetStateAction<GarageCar[]>>;
}

export default function GaragePage({ setActivePage, cars, setCars }: GaragePageProps) {
  const [addMode, setAddMode] = useState(false);
  const [form, setForm] = useState({ make: '', model: '', year: '', vin: '', plate: '' });
  const [justAdded, setJustAdded] = useState<number | null>(null);

  const handleAdd = () => {
    if (!form.make || !form.model) return;
    const newCar: GarageCar = {
      id: Date.now(),
      make: form.make,
      model: form.model,
      year: parseInt(form.year) || 2020,
      vin: form.vin,
      mileage: 0,
      plate: form.plate,
      color: '#7f8c8d',
    };
    setCars((prev) => [...prev, newCar]);
    setJustAdded(newCar.id);
    setForm({ make: '', model: '', year: '', vin: '', plate: '' });
    setAddMode(false);
    setTimeout(() => setJustAdded(null), 3000);
  };

  return (
    <div className="p-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-wide">
            Мой <span className="text-primary">гараж</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {cars.length} {cars.length === 1 ? 'автомобиль' : cars.length < 5 ? 'автомобиля' : 'автомобилей'}
          </p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
        >
          <Icon name={addMode ? 'X' : 'Plus'} size={16} />
          {addMode ? 'Отмена' : 'Добавить авто'}
        </button>
      </div>

      {addMode && (
        <div className="bg-card border border-primary/30 rounded-xl p-5 mb-6 animate-fade-in">
          <h2 className="font-display text-base font-semibold text-foreground mb-4">Новый автомобиль</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'make', label: 'Марка', placeholder: 'Toyota' },
              { key: 'model', label: 'Модель', placeholder: 'Camry' },
              { key: 'year', label: 'Год', placeholder: '2020' },
              { key: 'plate', label: 'Гос. номер', placeholder: 'А123БВ77' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
                <input
                  type="text"
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            ))}
          </div>
          <div className="mt-3">
            <label className="text-xs text-muted-foreground mb-1 block">VIN-код</label>
            <input
              type="text"
              value={form.vin}
              onChange={(e) => setForm({ ...form, vin: e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '') })}
              placeholder="17 символов"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-primary/50"
              maxLength={17}
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={!form.make || !form.model}
            className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Сохранить
          </button>
        </div>
      )}

      {cars.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Icon name="Car" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Гараж пуст</p>
          <p className="text-sm mt-1">Найдите автомобиль по VIN или добавьте вручную</p>
          <button
            onClick={() => setActivePage('home')}
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Icon name="Search" size={14} /> Поиск по VIN
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`bg-card border rounded-xl p-5 transition-all group ${
                justAdded === car.id
                  ? 'border-primary/60 shadow-[0_0_20px_rgba(255,111,0,0.15)]'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              {justAdded === car.id && (
                <div className="flex items-center gap-2 text-xs text-primary mb-3 animate-fade-in">
                  <Icon name="CheckCircle" size={13} />
                  Автомобиль добавлен в гараж
                </div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: car.color + '22', border: `2px solid ${car.color}44` }}
                >
                  <Icon name="Car" size={26} style={{ color: car.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-xl font-semibold text-foreground tracking-wide">
                      {car.make} {car.model}
                    </h3>
                    {car.plate && (
                      <span className="text-xs bg-secondary border border-border rounded-md px-2 py-0.5 text-muted-foreground font-mono">
                        {car.plate}
                      </span>
                    )}
                    {car.year > 0 && (
                      <span className="text-xs bg-secondary border border-border rounded-md px-2 py-0.5 text-muted-foreground">
                        {car.year}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    {car.vin && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Hash" size={12} />
                        <span className="font-mono">{car.vin}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon name="Gauge" size={12} />
                      <span>{car.mileage.toLocaleString('ru')} км</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActivePage('catalog')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded-lg text-xs font-medium transition-all"
                  >
                    <Icon name="Search" size={13} /> Запчасти
                  </button>
                  <button
                    onClick={() => setCars((prev) => prev.filter((c) => c.id !== car.id))}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                  >
                    <Icon name="Trash2" size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
