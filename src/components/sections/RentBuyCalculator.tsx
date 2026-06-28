'use client';

import { useMemo, useState } from 'react';
import Select from '@/components/ui/Select';

/* ── Category presets: a typical buy price and Elk daily rent ── */
interface Category {
  value: string;
  label: string;
  price: number;
  rate: number;
}

const CATEGORIES: Category[] = [
  { value: 'power-tools', label: 'Power tools', price: 15000, rate: 350 },
  { value: 'electronics', label: 'Cameras & Electronics', price: 60000, rate: 800 },
  { value: 'furniture', label: 'Furniture', price: 20000, rate: 300 },
  { value: 'event', label: 'Event & Party equipment', price: 25000, rate: 600 },
  { value: 'vehicles', label: 'Vehicles', price: 80000, rate: 1200 },
  { value: 'construction', label: 'Construction equipment', price: 120000, rate: 2000 },
  { value: 'appliances', label: 'Home appliances', price: 30000, rate: 400 },
  { value: 'other', label: 'Other', price: 10000, rate: 250 },
];

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export default function RentBuyCalculator() {
  const [categoryVal, setCategoryVal] = useState(CATEGORIES[0].value);
  const [price, setPrice] = useState(String(CATEGORIES[0].price));
  const [rate, setRate] = useState(String(CATEGORIES[0].rate));
  const [days, setDays] = useState(20);

  const onCategoryChange = (val: string) => {
    const c = CATEGORIES.find((x) => x.value === val) ?? CATEGORIES[0];
    setCategoryVal(val);
    setPrice(String(c.price));
    setRate(String(c.rate));
  };

  const { rentCost, buyCost, rentCheaper, save, breakevenDays } = useMemo(() => {
    const p = Math.max(0, parseFloat(price) || 0);
    const r = Math.max(0, parseFloat(rate) || 0);

    const rentCost = r * days;
    const buyCost = p;

    return {
      rentCost,
      buyCost,
      rentCheaper: rentCost < buyCost,
      save: Math.abs(buyCost - rentCost),
      breakevenDays: r > 0 ? Math.round(p / r) : null,
    };
  }, [price, rate, days]);

  return (
    <div className="bg-white rounded-[22px] p-6 sm:p-8 shadow-[var(--shadow-card)]">
      {/* Heading */}
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-teal shrink-0" />
        <h2 className="font-bold text-[1.05rem] text-ink">Rent or buy? Let&apos;s find out</h2>
      </div>

      {/* Step 1 — what & prices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-[0.8rem] font-bold text-ink mb-1.5">What do you need?</label>
          <Select
            options={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
            value={categoryVal}
            onChange={onCategoryChange}
          />
        </div>
        <div>
          <label className="block text-[0.8rem] font-bold text-ink mb-1.5">Price to buy it (₹)</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={numCls}
          />
        </div>
        <div>
          <label className="block text-[0.8rem] font-bold text-ink mb-1.5">Rent per day (₹)</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={numCls}
          />
        </div>
      </div>

      {/* Step 2 — how long */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[0.85rem] font-bold text-ink">
            How many days will you use it?
          </label>
          <span className="text-[0.95rem] font-bold text-teal tabular-nums">
            {days} {days === 1 ? 'day' : 'days'}
          </span>
        </div>
        <Slider min={1} max={365} value={days} onChange={setDays} />
      </div>

      {/* Verdict banner */}
      <div
        className={`rounded-[16px] p-5 mb-5 flex items-center gap-4 ${
          rentCheaper ? 'bg-teal-light' : 'bg-[#eaf2fd]'
        }`}
      >
        <div>
          <p className={`font-black text-[1.2rem] leading-tight mb-1 ${rentCheaper ? 'text-teal-dark' : 'text-[#2563c9]'}`}>
            {rentCheaper ? 'Renting is cheaper' : 'Buying is cheaper'} — you save {inr(save)}
          </p>
          <p className={`text-[0.9rem] leading-[1.5] ${rentCheaper ? 'text-teal-dark/80' : 'text-[#3a6bb5]'}`}>
            For {days} {days === 1 ? 'day' : 'days'}, renting costs {inr(rentCost)} and buying
            costs {inr(buyCost)}.
          </p>
        </div>
      </div>

      {/* The two costs, side by side */}
      <div className="grid grid-cols-2 gap-3">
        <CostCard
          label="If you rent"
          value={inr(rentCost)}
          sub={`for ${days} ${days === 1 ? 'day' : 'days'}`}
          winner={rentCheaper}
        />
        <CostCard
          label="If you buy"
          value={inr(buyCost)}
          sub="one-time"
          winner={!rentCheaper}
        />
      </div>

    </div>
  );
}

const numCls =
  'w-full border border-beige-dark rounded-[10px] px-4 py-2.5 text-[0.95rem] text-ink bg-beige outline-none transition-colors focus:border-teal focus:bg-white placeholder:text-ink-soft/50';

function Slider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-4 flex items-center">
      <div className="absolute inset-x-0 h-1 rounded-full bg-beige-dark" />
      <div className="absolute left-0 h-1 rounded-full bg-teal" style={{ width: `${pct}%` }} />
      <div
        className="absolute w-3.5 h-3.5 rounded-full bg-teal shadow-[0_1px_3px_rgba(0,0,0,0.25)] -translate-x-1/2"
        style={{ left: `${pct}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0"
      />
    </div>
  );
}

function CostCard({
  label,
  value,
  sub,
  winner,
}: {
  label: string;
  value: string;
  sub: string;
  winner: boolean;
}) {
  return (
    <div
      className={`rounded-[14px] p-4 border-2 transition-colors ${
        winner ? 'border-teal bg-teal-light' : 'border-beige-dark bg-beige'
      }`}
    >
      <div className="text-[0.78rem] text-ink-soft mb-1">{label}</div>
      <div className={`font-black text-[1.5rem] leading-tight ${winner ? 'text-teal-dark' : 'text-ink'}`}>
        {value}
      </div>
      <div className="text-[0.72rem] text-ink-soft mt-0.5">{sub}</div>
    </div>
  );
}
