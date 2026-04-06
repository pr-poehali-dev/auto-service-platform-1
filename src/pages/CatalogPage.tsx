import { useState } from 'react';
import Icon from '@/components/ui/icon';

const makes = ['Toyota', 'BMW', 'Volkswagen', 'Honda', 'Hyundai', 'Kia', 'Mercedes', 'Audi', 'Lada', 'Nissan', 'Mazda', 'Ford'];
const categories = ['Тормозная система', 'Двигатель', 'Подвеска', 'Фильтры', 'Электрика', 'Кузов', 'Трансмиссия', 'Охлаждение', 'Выхлоп', 'Масла и жидкости'];

interface Part {
  name: string;
  art: string;
  price: number;
  brand: string;
  cat: string;
  inStock: boolean;
  rating: number;
  manufacturer: string;
  shops: { name: string; url: string; price?: number }[];
}

const allParts: Part[] = [
  // Тормозная система
  {
    name: 'Тормозные колодки передние',
    art: 'TRW GDB3392',
    price: 2490, brand: 'Toyota', cat: 'Тормозная система', inStock: true, rating: 4.8, manufacturer: 'TRW',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/GDB3392', price: 2490 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=GDB3392', price: 2380 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=GDB3392', price: 2550 },
    ],
  },
  {
    name: 'Тормозные колодки задние',
    art: 'BREMBO P30042',
    price: 3100, brand: 'Mercedes', cat: 'Тормозная система', inStock: true, rating: 5.0, manufacturer: 'Brembo',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/P30042', price: 3100 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=P30042', price: 2990 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=P30042', price: 3250 },
    ],
  },
  {
    name: 'Тормозной диск передний вентилируемый',
    art: 'BOSCH 0986478931',
    price: 4200, brand: 'BMW', cat: 'Тормозная система', inStock: true, rating: 4.7, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0986478931', price: 4200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0986478931', price: 4100 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=0986478931', price: 4350 },
    ],
  },
  {
    name: 'Тормозной суппорт передний',
    art: 'ATE 24.3282-0234.5',
    price: 9800, brand: 'Audi', cat: 'Тормозная система', inStock: false, rating: 4.5, manufacturer: 'ATE',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/ATE+24.3282', price: 9800 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=ATE+24.3282', price: 9500 },
    ],
  },
  {
    name: 'Тормозной шланг передний',
    art: 'FEBI 01583',
    price: 650, brand: 'Volkswagen', cat: 'Тормозная система', inStock: true, rating: 4.4, manufacturer: 'Febi',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/FEBI+01583', price: 650 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=FEBI+01583', price: 620 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=FEBI+01583', price: 680 },
    ],
  },

  // Двигатель
  {
    name: 'Свечи зажигания (4 шт)',
    art: 'NGK BKR6EK',
    price: 3200, brand: 'Honda', cat: 'Двигатель', inStock: true, rating: 4.7, manufacturer: 'NGK',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/BKR6EK', price: 3200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=BKR6EK', price: 3050 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=BKR6EK', price: 3300 },
    ],
  },
  {
    name: 'Ремень ГРМ',
    art: 'GATES T43102',
    price: 2100, brand: 'Kia', cat: 'Двигатель', inStock: false, rating: 4.4, manufacturer: 'Gates',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/T43102', price: 2100 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=T43102', price: 1980 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=T43102', price: 2200 },
    ],
  },
  {
    name: 'Топливный насос',
    art: 'BOSCH 0580314114',
    price: 8500, brand: 'Audi', cat: 'Двигатель', inStock: true, rating: 4.3, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0580314114', price: 8500 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0580314114', price: 8200 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=0580314114', price: 8800 },
    ],
  },
  {
    name: 'Цепь ГРМ',
    art: 'IWIS 59130',
    price: 3400, brand: 'BMW', cat: 'Двигатель', inStock: true, rating: 4.6, manufacturer: 'IWIS',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/IWIS+59130', price: 3400 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=IWIS+59130', price: 3300 },
    ],
  },
  {
    name: 'Прокладка ГБЦ',
    art: 'ELRING 005.790',
    price: 1890, brand: 'Volkswagen', cat: 'Двигатель', inStock: true, rating: 4.8, manufacturer: 'Elring',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/ELRING+005.790', price: 1890 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=ELRING+005.790', price: 1820 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=ELRING+005.790', price: 1950 },
    ],
  },
  {
    name: 'Катушка зажигания',
    art: 'BOSCH 0221504470',
    price: 2800, brand: 'Mercedes', cat: 'Двигатель', inStock: true, rating: 4.5, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0221504470', price: 2800 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0221504470', price: 2700 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=0221504470', price: 2900 },
    ],
  },
  {
    name: 'Форсунка топливная',
    art: 'BOSCH 0280150501',
    price: 4600, brand: 'Toyota', cat: 'Двигатель', inStock: false, rating: 4.4, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0280150501', price: 4600 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0280150501', price: 4500 },
    ],
  },

  // Подвеска
  {
    name: 'Амортизатор передний',
    art: 'SACHS 312578',
    price: 6800, brand: 'Hyundai', cat: 'Подвеска', inStock: true, rating: 4.6, manufacturer: 'Sachs',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/312578', price: 6800 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=312578', price: 6600 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=312578', price: 7100 },
    ],
  },
  {
    name: 'Амортизатор задний',
    art: 'KAYABA 341279',
    price: 4900, brand: 'Nissan', cat: 'Подвеска', inStock: true, rating: 4.5, manufacturer: 'Kayaba',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/341279', price: 4900 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=341279', price: 4750 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=341279', price: 5100 },
    ],
  },
  {
    name: 'Сайлентблок рычага переднего',
    art: 'LEMFORDER 34976 01',
    price: 1200, brand: 'BMW', cat: 'Подвеска', inStock: true, rating: 4.7, manufacturer: 'Lemförder',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/LEMFORDER+34976', price: 1200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=LEMFORDER+34976', price: 1150 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=LEMFORDER+34976', price: 1250 },
    ],
  },
  {
    name: 'Шаровая опора нижняя',
    art: 'MOOG TO-BJ-10620',
    price: 2200, brand: 'Toyota', cat: 'Подвеска', inStock: true, rating: 4.6, manufacturer: 'Moog',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/TO-BJ-10620', price: 2200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=TO-BJ-10620', price: 2100 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=TO-BJ-10620', price: 2300 },
    ],
  },
  {
    name: 'Рулевая тяга внешняя',
    art: 'TRW JTE388',
    price: 1800, brand: 'Hyundai', cat: 'Подвеска', inStock: false, rating: 4.3, manufacturer: 'TRW',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/JTE388', price: 1800 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=JTE388', price: 1750 },
    ],
  },
  {
    name: 'Стойка стабилизатора передняя',
    art: 'FEBI 11956',
    price: 890, brand: 'Volkswagen', cat: 'Подвеска', inStock: true, rating: 4.4, manufacturer: 'Febi',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/FEBI+11956', price: 890 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=FEBI+11956', price: 850 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=FEBI+11956', price: 920 },
    ],
  },
  {
    name: 'Ступичный подшипник передний',
    art: 'FAG 713678730',
    price: 3500, brand: 'Kia', cat: 'Подвеска', inStock: true, rating: 4.8, manufacturer: 'FAG',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/713678730', price: 3500 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=713678730', price: 3400 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=713678730', price: 3650 },
    ],
  },

  // Фильтры
  {
    name: 'Масляный фильтр двигателя',
    art: 'MANN W712/73',
    price: 890, brand: 'BMW', cat: 'Фильтры', inStock: true, rating: 4.9, manufacturer: 'Mann-Filter',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/W712%2F73', price: 890 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=W712%2F73', price: 850 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=W712%2F73', price: 920 },
    ],
  },
  {
    name: 'Воздушный фильтр двигателя',
    art: 'MANN C 27 006',
    price: 1100, brand: 'Audi', cat: 'Фильтры', inStock: true, rating: 4.7, manufacturer: 'Mann-Filter',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/C+27+006', price: 1100 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=C+27+006', price: 1050 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=C+27+006', price: 1150 },
    ],
  },
  {
    name: 'Фильтр салона угольный',
    art: 'FILTRON AP139/1',
    price: 1290, brand: 'Volkswagen', cat: 'Фильтры', inStock: false, rating: 4.5, manufacturer: 'Filtron',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/AP139%2F1', price: 1290 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=AP139%2F1', price: 1240 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=AP139%2F1', price: 1350 },
    ],
  },
  {
    name: 'Топливный фильтр',
    art: 'BOSCH 0 450 906 508',
    price: 1400, brand: 'Ford', cat: 'Фильтры', inStock: true, rating: 4.6, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0450906508', price: 1400 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0450906508', price: 1350 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=0450906508', price: 1460 },
    ],
  },
  {
    name: 'Фильтр АКПП',
    art: 'MANN H 2011/1 x',
    price: 2100, brand: 'Mercedes', cat: 'Фильтры', inStock: true, rating: 4.5, manufacturer: 'Mann-Filter',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/H+2011%2F1+x', price: 2100 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=H+2011%2F1+x', price: 2000 },
    ],
  },

  // Электрика
  {
    name: 'Генератор 90А',
    art: 'VALEO 437549',
    price: 14500, brand: 'Honda', cat: 'Электрика', inStock: true, rating: 4.6, manufacturer: 'Valeo',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/437549', price: 14500 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=437549', price: 14200 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=437549', price: 15000 },
    ],
  },
  {
    name: 'Стартер 1.4 кВт',
    art: 'BOSCH 0001108208',
    price: 9200, brand: 'Volkswagen', cat: 'Электрика', inStock: true, rating: 4.4, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0001108208', price: 9200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0001108208', price: 8900 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=0001108208', price: 9500 },
    ],
  },
  {
    name: 'Датчик кислорода (лямбда)',
    art: 'BOSCH 0258003477',
    price: 3800, brand: 'Toyota', cat: 'Электрика', inStock: true, rating: 4.5, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0258003477', price: 3800 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0258003477', price: 3700 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=0258003477', price: 3950 },
    ],
  },
  {
    name: 'Датчик температуры охл. жидкости',
    art: 'FEBI 11837',
    price: 780, brand: 'BMW', cat: 'Электрика', inStock: true, rating: 4.3, manufacturer: 'Febi',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/FEBI+11837', price: 780 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=FEBI+11837', price: 750 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=FEBI+11837', price: 810 },
    ],
  },
  {
    name: 'Датчик ABS передний',
    art: 'BOSCH 0265008025',
    price: 2400, brand: 'Mazda', cat: 'Электрика', inStock: false, rating: 4.7, manufacturer: 'Bosch',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/0265008025', price: 2400 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=0265008025', price: 2300 },
    ],
  },

  // Трансмиссия
  {
    name: 'Сцепление (комплект)',
    art: 'SACHS 3000 950 022',
    price: 12900, brand: 'Kia', cat: 'Трансмиссия', inStock: true, rating: 4.7, manufacturer: 'Sachs',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/3000+950+022', price: 12900 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=3000+950+022', price: 12500 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=3000+950+022', price: 13400 },
    ],
  },
  {
    name: 'ШРУС наружный',
    art: 'GKN 302021',
    price: 5600, brand: 'Volkswagen', cat: 'Трансмиссия', inStock: true, rating: 4.6, manufacturer: 'GKN',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/302021', price: 5600 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=302021', price: 5400 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=302021', price: 5800 },
    ],
  },
  {
    name: 'Пыльник ШРУС наружный',
    art: 'LOBRO 304233',
    price: 980, brand: 'Audi', cat: 'Трансмиссия', inStock: true, rating: 4.4, manufacturer: 'Lobro',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/304233', price: 980 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=304233', price: 950 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=304233', price: 1020 },
    ],
  },

  // Охлаждение
  {
    name: 'Термостат двигателя',
    art: 'WAHLER 4106.82D',
    price: 1650, brand: 'BMW', cat: 'Охлаждение', inStock: true, rating: 4.6, manufacturer: 'Wahler',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/4106.82D', price: 1650 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=4106.82D', price: 1600 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=4106.82D', price: 1710 },
    ],
  },
  {
    name: 'Помпа охлаждения',
    art: 'GATES WP0103',
    price: 4300, brand: 'Toyota', cat: 'Охлаждение', inStock: true, rating: 4.7, manufacturer: 'Gates',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/WP0103', price: 4300 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=WP0103', price: 4150 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=WP0103', price: 4500 },
    ],
  },
  {
    name: 'Радиатор охлаждения',
    art: 'NISSENS 67531',
    price: 8900, brand: 'Hyundai', cat: 'Охлаждение', inStock: false, rating: 4.5, manufacturer: 'Nissens',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/67531', price: 8900 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=67531', price: 8700 },
    ],
  },
  {
    name: 'Расширительный бачок',
    art: 'FEBI 14690',
    price: 1250, brand: 'Volkswagen', cat: 'Охлаждение', inStock: true, rating: 4.3, manufacturer: 'Febi',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/FEBI+14690', price: 1250 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=FEBI+14690', price: 1200 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=FEBI+14690', price: 1300 },
    ],
  },

  // Выхлоп
  {
    name: 'Катализатор',
    art: 'BOSAL 090-159',
    price: 11200, brand: 'Honda', cat: 'Выхлоп', inStock: false, rating: 4.5, manufacturer: 'Bosal',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/090-159', price: 11200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=090-159', price: 10900 },
    ],
  },
  {
    name: 'Прокладка выпускного коллектора',
    art: 'ELRING 033.390',
    price: 680, brand: 'Mercedes', cat: 'Выхлоп', inStock: true, rating: 4.6, manufacturer: 'Elring',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/ELRING+033.390', price: 680 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=ELRING+033.390', price: 650 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=ELRING+033.390', price: 710 },
    ],
  },
  {
    name: 'Глушитель задний',
    art: 'BOSAL 233-161',
    price: 6400, brand: 'Nissan', cat: 'Выхлоп', inStock: true, rating: 4.4, manufacturer: 'Bosal',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/233-161', price: 6400 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=233-161', price: 6200 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=233-161', price: 6600 },
    ],
  },

  // Кузов
  {
    name: 'Фара передняя левая',
    art: 'VALEO 043676',
    price: 18500, brand: 'Toyota', cat: 'Кузов', inStock: true, rating: 4.5, manufacturer: 'Valeo',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/043676', price: 18500 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=043676', price: 18000 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=043676', price: 19200 },
    ],
  },
  {
    name: 'Крыло переднее левое',
    art: 'BLIC 6504-04-9506311P',
    price: 4200, brand: 'Volkswagen', cat: 'Кузов', inStock: true, rating: 4.3, manufacturer: 'Blic',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/6504-04-9506311P', price: 4200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=6504-04-9506311P', price: 4100 },
    ],
  },
  {
    name: 'Стекло лобовое',
    art: 'PILKINGTON 702028',
    price: 12800, brand: 'Ford', cat: 'Кузов', inStock: false, rating: 4.7, manufacturer: 'Pilkington',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/702028', price: 12800 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=702028', price: 12500 },
    ],
  },

  // Масла и жидкости
  {
    name: 'Масло моторное 5W-30 (4л)',
    art: 'CASTROL 15665E',
    price: 2890, brand: 'Lada', cat: 'Масла и жидкости', inStock: true, rating: 4.9, manufacturer: 'Castrol',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/CASTROL+5W-30', price: 2890 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=CASTROL+5W-30', price: 2800 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=CASTROL+5W-30', price: 2950 },
    ],
  },
  {
    name: 'Масло трансмиссионное 75W-90 (1л)',
    art: 'CASTROL 15067B',
    price: 980, brand: 'Mazda', cat: 'Масла и жидкости', inStock: true, rating: 4.7, manufacturer: 'Castrol',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/CASTROL+75W-90', price: 980 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=CASTROL+75W-90', price: 950 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=CASTROL+75W-90', price: 1020 },
    ],
  },
  {
    name: 'Тормозная жидкость DOT 4 (500мл)',
    art: 'ATE 03.9901-0502.2',
    price: 650, brand: 'Mercedes', cat: 'Масла и жидкости', inStock: true, rating: 4.8, manufacturer: 'ATE',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/ATE+DOT4', price: 650 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=ATE+DOT4', price: 620 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=ATE+DOT4', price: 680 },
    ],
  },
  {
    name: 'Охлаждающая жидкость G12+ (5л)',
    art: 'VAICO V60-0059',
    price: 1200, brand: 'Audi', cat: 'Масла и жидкости', inStock: true, rating: 4.6, manufacturer: 'Vaico',
    shops: [
      { name: 'Autodoc', url: 'https://www.autodoc.ru/search/V60-0059', price: 1200 },
      { name: 'Exist', url: 'https://exist.ru/Price/?goods=V60-0059', price: 1150 },
      { name: 'Emex', url: 'https://emex.ru/parts/?search=V60-0059', price: 1250 },
    ],
  },
];

const shopColors: Record<string, string> = {
  Autodoc: 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/30 border-blue-500/30',
  Exist: 'bg-green-500/15 text-green-400 hover:bg-green-500/30 border-green-500/30',
  Emex: 'bg-orange-500/15 text-orange-400 hover:bg-orange-500/30 border-orange-500/30',
};

const ALL_SHOPS = ['Autodoc', 'Exist', 'Emex'];

export default function CatalogPage() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [search, setSearch] = useState('');
  const [cartAdded, setCartAdded] = useState<Set<string>>(new Set());
  const [expandedShops, setExpandedShops] = useState<Set<string>>(new Set());
  const [compareSet, setCompareSet] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  const filtered = allParts.filter((p) => {
    if (selectedMake && p.brand !== selectedMake) return false;
    if (selectedCat && p.cat !== selectedCat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.art.toLowerCase().includes(search.toLowerCase()) && !p.manufacturer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToCart = (art: string) => setCartAdded((prev) => new Set([...prev, art]));

  const toggleShops = (art: string) => setExpandedShops((prev) => {
    const next = new Set(prev);
    if (next.has(art)) { next.delete(art); } else { next.add(art); }
    return next;
  });

  const toggleCompare = (art: string) => {
    setCompareSet((prev) => {
      const next = new Set(prev);
      if (next.has(art)) {
        next.delete(art);
      } else if (next.size < 4) {
        next.add(art);
      }
      return next;
    });
  };

  const minShopPrice = (part: Part) => Math.min(...part.shops.map((s) => s.price ?? part.price));

  const compareParts = allParts.filter((p) => compareSet.has(p.art));

  // best price per part per shop
  const getBestShopForPart = (part: Part): string => {
    let best = '';
    let bestPrice = Infinity;
    part.shops.forEach((s) => {
      if ((s.price ?? part.price) < bestPrice) {
        bestPrice = s.price ?? part.price;
        best = s.name;
      }
    });
    return best;
  };

  return (
    <div className="p-6 animate-fade-in max-w-5xl">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-wide">
            Каталог <span className="text-primary">запчастей</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{allParts.length} позиций в каталоге</p>
        </div>
        {compareSet.size > 0 && (
          <button
            onClick={() => setShowCompare(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all animate-fade-in"
          >
            <Icon name="BarChart2" size={16} />
            Сравнить {compareSet.size} {compareSet.size === 1 ? 'товар' : compareSet.size < 5 ? 'товара' : 'товаров'}
          </button>
        )}
      </div>

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
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по названию, артикулу или производителю..."
                className="w-full bg-secondary border border-border rounded-lg pl-8 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">Найдено: {filtered.length} позиций</p>
            {compareSet.size > 0 && (
              <p className="text-xs text-primary">
                Выбрано для сравнения: {compareSet.size}/4
                <button onClick={() => setCompareSet(new Set())} className="ml-2 text-muted-foreground hover:text-foreground">
                  <Icon name="X" size={11} />
                </button>
              </p>
            )}
          </div>

          <div className="space-y-2">
            {filtered.map((part) => {
              const shopsOpen = expandedShops.has(part.art);
              const cheapest = minShopPrice(part);
              const inCompare = compareSet.has(part.art);
              const compareDisabled = !inCompare && compareSet.size >= 4;
              return (
                <div
                  key={part.art}
                  className={`bg-card border rounded-xl overflow-hidden transition-all group ${
                    inCompare ? 'border-primary/60' : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="p-4 flex items-center gap-4">
                    {/* Compare checkbox */}
                    <button
                      onClick={() => toggleCompare(part.art)}
                      disabled={compareDisabled}
                      title={compareDisabled ? 'Максимум 4 товара' : inCompare ? 'Убрать из сравнения' : 'Добавить к сравнению'}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        inCompare
                          ? 'bg-primary border-primary text-primary-foreground'
                          : compareDisabled
                          ? 'border-border opacity-30 cursor-not-allowed'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {inCompare && <Icon name="Check" size={11} />}
                    </button>

                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Package" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{part.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs text-muted-foreground font-mono">{part.art}</span>
                        <span className="text-muted-foreground text-xs">·</span>
                        <span className="text-xs text-muted-foreground">{part.manufacturer}</span>
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
                      {cheapest < part.price && (
                        <p className="text-xs text-green-400 mt-0.5">от {cheapest.toLocaleString('ru')} ₽</p>
                      )}
                      <p className={`text-xs mt-0.5 ${part.inStock ? 'text-green-400' : 'text-yellow-400'}`}>
                        {part.inStock ? '✓ В наличии' : '⏱ Под заказ'}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => addToCart(part.art)}
                        className={`p-2.5 rounded-lg transition-all ${
                          cartAdded.has(part.art)
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground'
                        }`}
                        title="В корзину"
                      >
                        <Icon name={cartAdded.has(part.art) ? 'Check' : 'ShoppingCart'} size={16} />
                      </button>
                      <button
                        onClick={() => toggleShops(part.art)}
                        className={`p-2.5 rounded-lg transition-all ${
                          shopsOpen ? 'bg-secondary text-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                        title="Магазины"
                      >
                        <Icon name="ExternalLink" size={16} />
                      </button>
                    </div>
                  </div>

                  {shopsOpen && (
                    <div className="border-t border-border bg-background/50 px-4 py-3 animate-fade-in">
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-display mb-2">Купить в магазине</p>
                      <div className="flex flex-wrap gap-2">
                        {part.shops.map((shop) => (
                          <a
                            key={shop.name}
                            href={shop.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${shopColors[shop.name] ?? 'bg-secondary text-muted-foreground border-border hover:text-foreground'}`}
                          >
                            <Icon name="ExternalLink" size={12} />
                            {shop.name}
                            {shop.price && <span className="font-bold">{shop.price.toLocaleString('ru')} ₽</span>}
                          </a>
                        ))}
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(part.art + ' ' + part.manufacturer + ' купить')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground text-xs font-medium transition-all"
                        >
                          <Icon name="Search" size={12} />
                          Найти ещё
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

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

      {/* Compare modal */}
      {showCompare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-auto animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">Сравнение цен</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{compareParts.length} товара · {ALL_SHOPS.length} магазина</p>
              </div>
              <button
                onClick={() => setShowCompare(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-5 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-muted-foreground font-display uppercase tracking-wider pb-4 pr-4 w-48">Товар</th>
                    {ALL_SHOPS.map((shop) => (
                      <th key={shop} className="text-center pb-4 px-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md border ${shopColors[shop]}`}>{shop}</span>
                      </th>
                    ))}
                    <th className="text-center pb-4 px-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-md border border-border bg-secondary text-muted-foreground">Лучшая цена</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareParts.map((part, idx) => {
                    const bestShop = getBestShopForPart(part);
                    const bestPrice = minShopPrice(part);
                    return (
                      <tr key={part.art} className={idx < compareParts.length - 1 ? 'border-b border-border' : ''}>
                        <td className="py-4 pr-4">
                          <p className="font-semibold text-foreground text-sm leading-tight">{part.name}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">{part.art}</p>
                          <p className="text-xs text-muted-foreground">{part.manufacturer}</p>
                        </td>
                        {ALL_SHOPS.map((shopName) => {
                          const shopEntry = part.shops.find((s) => s.name === shopName);
                          const price = shopEntry?.price;
                          const isBest = shopName === bestShop;
                          return (
                            <td key={shopName} className="text-center px-3 py-4">
                              {shopEntry ? (
                                <a
                                  href={shopEntry.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all ${
                                    isBest
                                      ? 'border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                      : 'border-border bg-secondary text-foreground hover:border-primary/40'
                                  }`}
                                >
                                  {isBest && <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Дешевле</span>}
                                  <span className="font-bold text-sm">{price?.toLocaleString('ru')} ₽</span>
                                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                    <Icon name="ExternalLink" size={9} /> Купить
                                  </span>
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="text-center px-3 py-4">
                          <div className="inline-flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10">
                            <span className="text-xs text-muted-foreground">{bestShop}</span>
                            <span className="font-bold text-primary">{bestPrice.toLocaleString('ru')} ₽</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {compareParts.length > 1 && (
                  <tfoot>
                    <tr className="border-t-2 border-primary/30">
                      <td className="pt-4 pr-4">
                        <p className="text-xs font-bold text-foreground font-display uppercase tracking-wider">Итого (все товары)</p>
                      </td>
                      {ALL_SHOPS.map((shopName) => {
                        const total = compareParts.reduce((sum, part) => {
                          const shop = part.shops.find((s) => s.name === shopName);
                          return sum + (shop?.price ?? 0);
                        }, 0);
                        const hasAll = compareParts.every((p) => p.shops.some((s) => s.name === shopName));
                        return (
                          <td key={shopName} className="text-center px-3 pt-4">
                            {hasAll ? (
                              <span className="font-bold text-foreground">{total.toLocaleString('ru')} ₽</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">неполный</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="text-center px-3 pt-4">
                        <span className="font-bold text-primary">
                          {compareParts.reduce((sum, p) => sum + minShopPrice(p), 0).toLocaleString('ru')} ₽
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            <div className="px-5 pb-5">
              <button
                onClick={() => { setShowCompare(false); setCompareSet(new Set()); }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Закрыть и сбросить выбор
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}