'use client';

import { Archive, Bell, MessageSquare, Phone, Trash2, Video } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTimeline } from './TimelineProvider';

export default function FriendActions({ friend, variant = 'actions' }) {
  const { addEvent } = useTimeline();

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const addTimelineEvent = (type, actionLabel) => {
    addEvent({
      type,
      title: `${actionLabel} with ${friend.name}`,
      date: today,
      note: friend.tags?.[0] || 'Friend action',
    });

    toast.success(`${actionLabel} added to timeline`);
  };

  if (variant === 'checkin') {
    return (
      <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => addTimelineEvent('call', 'Call')}
          className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group"
        >
          <Phone size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
          <span className="text-slate-700 font-medium">Call</span>
        </button>
        <button
          type="button"
          onClick={() => addTimelineEvent('text', 'Text')}
          className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group"
        >
          <MessageSquare size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
          <span className="text-slate-700 font-medium">Text</span>
        </button>
        <button
          type="button"
          onClick={() => addTimelineEvent('video', 'Video')}
          className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group"
        >
          <Video size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
          <span className="text-slate-700 font-medium">Video</span>
        </button>
      </div>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm"
      >
        <Bell size={18} />
        Snooze 2 Weeks
      </button>
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm"
      >
        <Archive size={18} />
        Archive
      </button>
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-[#ef4444] font-medium hover:bg-red-50 transition-colors shadow-sm"
      >
        <Trash2 size={18} />
        Delete
      </button>
    </>
  );
}
