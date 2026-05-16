'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';

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

  return (
    <TimelineContext.Provider value={value}>
      {children}
      <ToastContainer position="top-center" autoClose={1800} hideProgressBar closeOnClick pauseOnHover theme="light" />
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }

  return context;
}
