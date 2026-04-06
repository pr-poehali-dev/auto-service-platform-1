import { useState } from 'react';
import Icon from '@/components/ui/icon';

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  new: { label: 'Новый', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30', icon: 'Clock' },
  processing: { label: 'Обрабатывается', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', icon: 'RefreshCw' },
  shipped: { label: 'Отправлен', color: 'text-purple-400 bg-purple-400/10 border-purple-400/30', icon: 'Truck' },
  delivered: { label: 'Доставлен', color: 'text-green-400 bg-green-400/10 border-green-400/30', icon: 'CheckCircle' },
  cancelled: { label: 'Отменён', color: 'text-red-400 bg-red-400/10 border-red-400/30', icon: 'XCircle' },
};

const orders = [
  {
    id: 'ORD-2024-001',
    date: '02.04.2024',
    status: 'delivered',
    total: 6380,
    items: [
      { name: 'Тормозные колодки передние', art: 'TRW GDB3392', qty: 1, price: 2490 },
      { name: 'Масляный фильтр', art: 'MANN W712/73', qty: 2, price: 890 },
      { name: 'Воздушный фильтр', art: 'FILTRON AP139/1', qty: 1, price: 1290 },
      { name: 'Свечи зажигания', art: 'NGK BKR6EK', qty: 1, price: 820 },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '05.04.2024',
    status: 'processing',
    total: 8500,
    items: [
      { name: 'Топливный насос', art: 'BOSCH 0580314114', qty: 1, price: 8500 },
    ],
  },
  {
    id: 'ORD-2024-003',
    date: '06.04.2024',
    status: 'new',
    total: 3100,
    items: [
      { name: 'Колодки тормозные задние', art: 'BREMBO P30042', qty: 1, price: 3100 },
    ],
  },
];

export default function OrdersPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="p-6 animate-fade-in max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-foreground tracking-wide mb-6">
        История <span className="text-primary">заказов</span>
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Всего заказов', value: orders.length, icon: 'ClipboardList' },
          { label: 'Выполнено', value: orders.filter((o) => o.status === 'delivered').length, icon: 'CheckCircle' },
          { label: 'В процессе', value: orders.filter((o) => ['new','processing','shipped'].includes(o.status)).length, icon: 'Clock' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
            <Icon name={stat.icon} size={20} className="mx-auto text-primary mb-2" />
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const s = statusConfig[order.status];
          const isOpen = expanded === order.id;
          return (
            <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all">
              <button
                className="w-full flex items-center gap-4 p-4 text-left"
                onClick={() => setExpanded(isOpen ? null : order.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-semibold text-foreground text-base">{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${s.color}`}>
                      <Icon name={s.icon} size={11} />
                      {s.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {order.date} · {order.items.length} {order.items.length === 1 ? 'товар' : 'товара'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{order.total.toLocaleString('ru')} ₽</p>
                </div>
                <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-muted-foreground" />
              </button>

              {isOpen && (
                <div className="border-t border-border px-4 pb-4 pt-3 animate-fade-in">
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-foreground">{item.name}</span>
                          <span className="text-xs text-muted-foreground font-mono ml-2">{item.art}</span>
                        </div>
                        <div className="text-right text-muted-foreground text-xs">
                          {item.qty} × {item.price.toLocaleString('ru')} ₽
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-3 pt-3 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Итого</span>
                    <span className="font-bold text-primary">{order.total.toLocaleString('ru')} ₽</span>
                  </div>
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <div className="mt-3 flex items-center gap-2">
                      {['new','processing','shipped','delivered'].map((step, i) => {
                        const statuses = ['new','processing','shipped','delivered'];
                        const cur = statuses.indexOf(order.status);
                        const done = i <= cur;
                        return (
                          <div key={step} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${done ? 'bg-primary' : 'bg-muted'}`} />
                            {i < 3 && <div className={`h-px w-8 ${i < cur ? 'bg-primary' : 'bg-muted'}`} />}
                          </div>
                        );
                      })}
                      <span className="text-xs text-muted-foreground ml-2">{s.label}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
