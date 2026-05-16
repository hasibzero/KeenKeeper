'use client';

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useTimeline } from './TimelineProvider';

const chartColors = {
  text: '#7c3aed',
  call: '#234e3f',
  video: '#3cab66',
};

const chartLabels = {
  text: 'Text',
  call: 'Call',
  video: 'Video',
};

export default function StatsView() {
  const { events } = useTimeline();

  const chartData = useMemo(() => {
    const counts = events.reduce(
      (accumulator, event) => {
        if (accumulator[event.type] !== undefined) {
          accumulator[event.type] += 1;
        }
        return accumulator;
      },
      { text: 0, call: 0, video: 0 }
    );

    return [
      { name: 'Text', value: counts.text, type: 'text' },
      { name: 'Call', value: counts.call, type: 'call' },
      { name: 'Video', value: counts.video, type: 'video' },
    ].filter((item) => item.value > 0);
  }, [events]);

  const hasActivity = chartData.length > 0;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800">Friendship Analytics</h1>

        <section className="mt-8 rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-medium text-emerald-900">By Interaction Type</h2>

          <div className="mt-6 flex min-h-90 flex-col items-center justify-center">
            {hasActivity ? (
              <div className="h-70 w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={72}
                      outerRadius={104}
                      paddingAngle={4}
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.type} fill={chartColors[entry.type]} stroke={chartColors[entry.type]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-70 w-full max-w-md items-center justify-center rounded-full border-8 border-dashed border-slate-200 text-sm text-slate-400">
                No timeline activity yet
              </div>
            )}

            <div className="mt-2 flex items-center justify-center gap-6 text-sm text-slate-500">
              {['text', 'call', 'video'].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColors[type] }} />
                  <span>{chartLabels[type]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
