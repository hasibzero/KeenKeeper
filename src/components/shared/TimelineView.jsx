'use client';

import { Filter, Clock3, MessageCircle, Phone, Video, Handshake } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTimeline } from './TimelineProvider';

const filterOptions = [
  { value: 'all', label: 'All activity' },
  { value: 'call', label: 'Calls' },
  { value: 'text', label: 'Texts' },
  { value: 'video', label: 'Videos' },
  { value: 'meetup', label: 'Meetups' },
  { value: 'snooze', label: 'Snoozes' },
  { value: 'archive', label: 'Archives' },
  { value: 'delete', label: 'Deletes' },
];

const iconMap = {
  call: Phone,
  text: MessageCircle,
  video: Video,
  meetup: Handshake,
  snooze: Clock3,
  archive: Clock3,
  delete: Clock3,
};

export default function TimelineView() {
  const { events } = useTimeline();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const visibleEvents = useMemo(() => {
    if (selectedFilter === 'all') {
      return events;
    }

    return events.filter((event) => event.type === selectedFilter);
  }, [events, selectedFilter]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">Timeline</h1>
          <p className="mt-2 text-sm text-slate-500">Actions from friend pages will appear here.</p>
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

        {visibleEvents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-700">No timeline activity yet.</p>
            <p className="mt-2 text-sm text-slate-500">Use the buttons on a friend detail page to add the first entry.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleEvents.map((event) => {
              const Icon = iconMap[event.type] || Clock3;

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
        )}
      </div>
    </main>
  );
}
