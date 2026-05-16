'use client';

import { useState } from 'react';
import { Archive, Bell, MessageSquare, Phone, Trash2, Video, X } from 'lucide-react';
import { useTimeline } from './TimelineProvider';

export default function FriendActions({ friend, variant = 'actions' }) {
  const { addEvent } = useTimeline();
  const [pendingAction, setPendingAction] = useState(null);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const openActionModal = (type, actionLabel) => {
    setPendingAction({
      type,
      actionLabel,
      title: `${actionLabel} with ${friend.name}`,
      note: friend.tags?.[0] || 'Friend action',
    });
  };

  const confirmAction = () => {
    if (!pendingAction) return;

    addEvent({
      type: pendingAction.type,
      title: pendingAction.title,
      date: today,
      note: pendingAction.note,
    });
    setPendingAction(null);
  };

  if (variant === 'checkin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => openActionModal('call', 'Call')}
          className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group"
        >
          <Phone size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
          <span className="text-slate-700 font-medium">Call</span>
        </button>
        <button
          type="button"
          onClick={() => openActionModal('text', 'Text')}
          className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group"
        >
          <MessageSquare size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
          <span className="text-slate-700 font-medium">Text</span>
        </button>
        <button
          type="button"
          onClick={() => openActionModal('video', 'Video')}
          className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group"
        >
          <Video size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
          <span className="text-slate-700 font-medium">Video</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openActionModal('snooze', 'Snoozed')}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm"
      >
        <Bell size={18} />
        Snooze 2 Weeks
      </button>
      <button
        type="button"
        onClick={() => openActionModal('archive', 'Archived')}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm"
      >
        <Archive size={18} />
        Archive
      </button>
      <button
        type="button"
        onClick={() => openActionModal('delete', 'Deleted')}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-[#ef4444] font-medium hover:bg-red-50 transition-colors shadow-sm"
      >
        <Trash2 size={18} />
        Delete
      </button>

      {pendingAction ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Confirm action</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add a timeline entry for {pendingAction.actionLabel.toLowerCase()} with {friend.name}?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-6 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="font-medium text-slate-700">{pendingAction.title}</div>
              <div>{today}</div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAction}
                className="rounded-lg bg-[#2b4d40] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e382e]"
              >
                Add to Timeline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
