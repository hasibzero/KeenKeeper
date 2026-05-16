'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const TimelineContext = createContext(null);

export function TimelineProvider({ children }) {
  const [events, setEvents] = useState([]);

  const value = useMemo(() => {
    return {
      events,
      addEvent: (event) => {
        setEvents((currentEvents) => [
          {
            id: `${event.type}-${Date.now()}`,
            ...event,
          },
          ...currentEvents,
        ]);
      },
    };
  }, [events]);

  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

export function useTimeline() {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }

  return context;
}
