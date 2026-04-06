import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  art: string;
  price: number;
  qty: number;
  inStock: boolean;
}

const initialCart: CartItem[] = [
  { id: 1, name: 'Тормозные колодки передние', art: 'TRW GDB3392', price: 2490, qty: 1, inStock: true },
  { id: 2, name: 'Масляный фильтр двигателя', art: 'MANN W712/73', price: 890, qty: 2, inStock: true },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [ordered, setOrdered] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setItems(items.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id: number) => setItems(items.filter((i) => i.id !== id));
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (ordered) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] animate-scale-in">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <Icon name="CheckCircle" size={40} className="text-green-400" />
        </div>
        <h2 className="font-display text-3xl font-bold text-foreground mb-2">Заказ оформлен!</h2>
        <p className="text-muted-foreground text-center max-w-sm">
          Мы обработаем ваш заказ в течение 30 минут и свяжемся с вами для подтверждения
        </p>
        <div className="mt-4 bg-card border border-border rounded-xl px-6 py-3">
          <p className="text-sm text-muted-foreground">Номер заказа</p>
          <p className="font-display font-bold text-primary text-lg">ORD-2024-004</p>
        </div>
        <button
          onClick={() => { setOrdered(false); setItems(initialCart); }}
          className="mt-6 px-6 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-muted transition-all"
        >
          Продолжить покупки
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-foreground tracking-wide mb-6">
        Корзина {items.length > 0 && <span className="text-primary">({items.length})</span>}
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Корзина пуста</p>
          <p className="text-sm mt-1">Перейдите в каталог, чтобы добавить товары</p>
        </div>
      ) : (
        <div className="flex gap-6">
          <div className="flex-1 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Package" size={20} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{item.art}</p>
                  <p className={`text-xs mt-0.5 ${item.inStock ? 'text-green-400' : 'text-yellow-400'}`}>
                    {item.inStock ? '✓ В наличии' : '⏱ Под заказ'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-md bg-secondary hover:bg-muted flex items-center justify-center text-foreground transition-all"
                  >
                    <Icon name="Minus" size={12} />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-foreground">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-md bg-secondary hover:bg-muted flex items-center justify-center text-foreground transition-all"
                  >
                    <Icon name="Plus" size={12} />
                  </button>
                </div>
                <div className="text-right w-24 flex-shrink-0">
                  <p className="font-bold text-foreground text-sm">{(item.price * item.qty).toLocaleString('ru')} ₽</p>
                  <p className="text-xs text-muted-foreground">{item.price.toLocaleString('ru')} ₽/шт</p>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl p-5 sticky top-20">
              <p className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Итого</p>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-muted-foreground">
                    <span className="truncate mr-2">{item.name.split(' ').slice(0,2).join(' ')}</span>
                    <span className="flex-shrink-0">{(item.price * item.qty).toLocaleString('ru')} ₽</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Итого</span>
                  <span className="font-bold text-primary text-lg">{total.toLocaleString('ru')} ₽</span>
                </div>
              </div>
              <button
                onClick={() => setOrdered(true)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Icon name="CreditCard" size={16} />
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
