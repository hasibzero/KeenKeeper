'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock3, MessageCircle, Phone, Video, Handshake, Archive, Trash2, Bell, Filter } from 'lucide-react';

const STORAGE_KEY = 'keenkeeper.timeline.events';

const seedEvents = [
  { id: 'seed-1', type: 'meetup', title: 'Meetup with Tom Baker', date: 'March 29, 2026', icon: Handshake },
  { id: 'seed-2', type: 'text', title: 'Text with Sarah Chen', date: 'March 28, 2026', icon: MessageCircle },
  { id: 'seed-3', type: 'meetup', title: 'Meetup with Olivia Martinez', date: 'March 26, 2026', icon: Handshake },
  { id: 'seed-4', type: 'video', title: 'Video with Aisha Patel', date: 'March 23, 2026', icon: Video },
  { id: 'seed-5', type: 'meetup', title: 'Meetup with Sarah Chen', date: 'March 21, 2026', icon: Handshake },
  { id: 'seed-6', type: 'call', title: 'Call with Marcus Johnson', date: 'March 19, 2026', icon: Phone },
  { id: 'seed-7', type: 'meetup', title: 'Meetup with Aisha Patel', date: 'March 17, 2026', icon: Handshake },
  { id: 'seed-8', type: 'text', title: 'Text with Olivia Martinez', date: 'March 13, 2026', icon: MessageCircle },
  { id: 'seed-9', type: 'call', title: 'Call with Lisa Nakamura', date: 'March 11, 2026', icon: Phone },
  { id: 'seed-10', type: 'call', title: 'Call with Sarah Chen', date: 'March 11, 2026', icon: Phone },
  { id: 'seed-11', type: 'video', title: 'Video with Marcus Johnson', date: 'March 6, 2026', icon: Video },
  { id: 'seed-12', type: 'video', title: "Video with Ryan O'Brien", date: 'February 24, 2026', icon: Video },
];

const filterOptions = [
  { value: 'all', label: 'All activity' },
  { value: 'call', label: 'Calls' },
  { value: 'text', label: 'Texts' },
  { value: 'video', label: 'Videos' },
  { value: 'meetup', label: 'Meetups' },
  { value: 'system', label: 'System events' },
];

const iconMap = {
  call: Phone,
  text: MessageCircle,
  video: Video,
  meetup: Handshake,
  archive: Archive,
  delete: Trash2,
  snooze: Bell,
  system: Clock3,
};

function normalizeEvent(event) {
  const type = event.type || 'system';
  return {
    ...event,
    type,
    icon: iconMap[type] || Clock3,
  };
}

export default function TimelineView() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [extraEvents, setExtraEvents] = useState([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setExtraEvents(Array.isArray(parsed) ? parsed.map(normalizeEvent) : []);
      }
    } catch {
      setExtraEvents([]);
    }
  }, []);

  const allEvents = useMemo(() => {
    return [...seedEvents.map(normalizeEvent), ...extraEvents].sort((left, right) => {
      return new Date(right.date).getTime() - new Date(left.date).getTime();
    });
  }, [extraEvents]);

  const visibleEvents = useMemo(() => {
    if (selectedFilter === 'all') return allEvents;
    return allEvents.filter((event) => event.type === selectedFilter);
  }, [allEvents, selectedFilter]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">Timeline</h1>
          <p className="mt-2 text-sm text-slate-500">Recent calls, texts, and notes will appear here.</p>
        </div>

        <div className="mb-5 max-w-45">
          <label className="sr-only" htmlFor="timeline-filter">Filter timeline</label>
          <div className="relative">
            <Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              id="timeline-filter"
              value={selectedFilter}
              onChange={(event) => setSelectedFilter(event.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm text-slate-600 shadow-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {visibleEvents.map((event) => {
            const Icon = event.icon;

            return (
              <article
                key={event.id}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
                  <Icon size={16} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h2 className="text-sm font-semibold text-slate-700">{event.title}</h2>
                    {event.note ? <span className="text-xs text-slate-500">{event.note}</span> : null}
                  </div>
                  <p className="text-xs text-slate-500">{event.date}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export function appendTimelineEvent(event) {
  if (typeof window === 'undefined') return;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const existing = stored ? JSON.parse(stored) : [];
    const nextEvent = normalizeEvent({
      id: `${event.type}-${Date.now()}`,
      ...event,
    });

    const next = [nextEvent, ...(Array.isArray(existing) ? existing : [])];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([event]));
  }
}