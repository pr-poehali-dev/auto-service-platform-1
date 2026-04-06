import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function AboutPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="p-6 animate-fade-in max-w-4xl">
      <h1 className="font-display text-3xl font-bold text-foreground tracking-wide mb-6">
        О <span className="text-primary">мастерской</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="font-display font-bold text-foreground text-lg mb-4">ta-dam! Автосервис</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Профессиональный автосервис и магазин запчастей. Работаем с 2015 года. Более 50 000 позиций в каталоге, 
              гарантия на все работы и оригинальные запчасти.
            </p>

            <div className="space-y-3">
              {[
                { icon: 'MapPin', label: 'Адрес', value: 'ул. Авторемонтная, 42, Москва' },
                { icon: 'Phone', label: 'Телефон', value: '+7 (495) 123-45-67' },
                { icon: 'Mail', label: 'Email', value: 'info@ta-dam.ru' },
                { icon: 'Clock', label: 'Режим работы', value: 'Пн–Сб: 9:00–20:00, Вс: 10:00–18:00' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={icon} size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm text-foreground font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '9+', label: 'лет опыта' },
              { value: '15к+', label: 'клиентов' },
              { value: '50к+', label: 'запчастей' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="h-44 bg-secondary flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Icon name="Map" size={36} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">Карта будет здесь</p>
                <p className="text-xs mt-1 opacity-60">ул. Авторемонтная, 42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-display font-bold text-foreground text-lg mb-1">Обратная связь</h2>
          <p className="text-sm text-muted-foreground mb-5">Ответим в течение часа в рабочее время</p>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="CheckCircle" size={32} className="text-green-400" />
              </div>
              <p className="font-semibold text-foreground mb-1">Заявка отправлена!</p>
              <p className="text-sm text-muted-foreground text-center">Мы свяжемся с вами в ближайшее время</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', phone: '', message: '' }); }}
                className="mt-4 text-xs text-primary hover:underline"
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Ваше имя', placeholder: 'Иван Иванов', type: 'text' },
                { key: 'phone', label: 'Телефон', placeholder: '+7 (___) ___-__-__', type: 'tel' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Опишите ваш вопрос или проблему..."
                  rows={5}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={16} />
                Отправить заявку
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
