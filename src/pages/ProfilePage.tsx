import { useState } from 'react';
import Icon from '@/components/ui/icon';

const notifications = [
  { id: 1, type: 'order', text: 'Заказ ORD-2024-002 передан в доставку', time: '2 ч назад', read: false },
  { id: 2, type: 'promo', text: 'Скидка 15% на тормозные колодки до конца недели', time: '5 ч назад', read: false },
  { id: 3, type: 'order', text: 'Заказ ORD-2024-001 успешно доставлен', time: 'Вчера', read: true },
  { id: 4, type: 'system', text: 'Добро пожаловать в ta-dam! Начните с добавления авто в гараж', time: '3 дня назад', read: true },
  { id: 5, type: 'promo', text: 'Новые поступления: моторные масла Shell и Castrol', time: '5 дней назад', read: true },
];

const notifIcon: Record<string, { icon: string; color: string }> = {
  order: { icon: 'Package', color: 'text-primary' },
  promo: { icon: 'Tag', color: 'text-green-400' },
  system: { icon: 'Bell', color: 'text-blue-400' },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const [notifs, setNotifs] = useState(notifications);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Иван Петров',
    phone: '+7 (916) 123-45-67',
    email: 'ivan@example.com',
    city: 'Москва',
  });

  const unreadCount = notifs.filter((n) => !n.read).length;
  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));

  return (
    <div className="p-6 animate-fade-in max-w-2xl">
      {/* User card */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="font-display text-xl font-bold text-primary">
            {userData.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">{userData.name}</h2>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1 mb-5 w-fit">
        {(['profile', 'notifications'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab === 'profile' ? 'User' : 'Bell'} size={14} />
            {tab === 'profile' ? 'Данные' : 'Уведомления'}
            {tab === 'notifications' && unreadCount > 0 && (
              <span className="w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-muted-foreground uppercase tracking-widest text-sm">Личные данные</h3>
            <button
              onClick={() => setEditing(!editing)}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <Icon name={editing ? 'X' : 'Pencil'} size={12} />
              {editing ? 'Отмена' : 'Редактировать'}
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            {Object.entries({ name: 'Имя', phone: 'Телефон', email: 'Email', city: 'Город' }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-20 flex-shrink-0">{label}</span>
                {editing ? (
                  <input
                    type="text"
                    value={userData[key as keyof typeof userData]}
                    onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                    className="flex-1 bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <span className="text-sm text-foreground font-medium">{userData[key as keyof typeof userData]}</span>
                )}
              </div>
            ))}
            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="mt-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                Сохранить
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-muted-foreground uppercase tracking-widest text-sm">
              Уведомления {unreadCount > 0 && <span className="text-primary">({unreadCount} новых)</span>}
            </h3>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                Прочитать все
              </button>
            )}
          </div>
          <div className="space-y-2">
            {notifs.map((n) => {
              const ni = notifIcon[n.type];
              return (
                <div
                  key={n.id}
                  className={`bg-card border rounded-xl p-4 flex items-start gap-3 transition-all ${
                    n.read ? 'border-border opacity-60' : 'border-primary/30'
                  }`}
                >
                  <div className={`mt-0.5 flex-shrink-0 ${ni.color}`}>
                    <Icon name={ni.icon} size={16} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${n.read ? 'text-muted-foreground' : 'text-foreground'}`}>{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
