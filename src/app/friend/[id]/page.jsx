import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Bell, 
  Archive, 
  Trash2, 
  Phone, 
  MessageSquare, 
  Video, 
  ChevronLeft 
} from 'lucide-react';

// Import your data (adjust the path to where your data.json lives)
import friendsData from '@/assets/data.json'; 

export default async function FriendDetail({ params }) {
  // 1. Get the ID from the URL and find the friend
  const { id } = await params;
  const friendId = parseInt(id, 10);
  const friend = friendsData.find((f) => f.id === friendId);

  // 2. If the user types an ID that doesn't exist, show a 404 page
  if (!friend) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT COLUMN: Profile & Actions */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            
            {/* Profile Card */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200">
                <img 
                  src={friend.avatarUrl} 
                  alt={friend.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-3">{friend.name}</h1>
              
              <div className="flex gap-2 mb-6">
                <span className="bg-[#ef4444] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {friend.status}
                </span>
                {friend.tags.map(tag => (
                  <span key={tag} className="bg-[#dcfce7] text-[#166534] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="italic text-slate-500 text-sm mb-2">
                "Former colleague, great mentor"
              </p>
              <p className="text-xs text-slate-400">
                Preferred: email
              </p>
            </div>

            {/* Action Buttons */}
            <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
              <Bell size={18} />
              Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
              <Archive size={18} />
              Archive
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 rounded-xl text-[#ef4444] font-medium hover:bg-red-50 transition-colors shadow-sm">
              <Trash2 size={18} />
              Delete
            </button>
          </div>

          {/* RIGHT COLUMN: Stats & Interactions */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#2b4d40] mb-2">62</span>
                <span className="text-slate-500 text-sm">Days Since Contact</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#2b4d40] mb-2">30</span>
                <span className="text-slate-500 text-sm">Goal (Days)</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-[#2b4d40] mb-2">Feb 27, 2026</span>
                <span className="text-slate-500 text-sm">Next Due</span>
              </div>
            </div>

            {/* Relationship Goal */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-[#2b4d40]">Relationship Goal</h2>
                <button className="text-sm font-medium text-slate-600 border border-gray-200 px-4 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
                  Edit
                </button>
              </div>
              <p className="text-slate-600">
                Connect every <span className="font-bold text-slate-800">30 days</span>
              </p>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-[#2b4d40] mb-6">Quick Check-In</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group">
                  <Phone size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
                  <span className="text-slate-700 font-medium">Call</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group">
                  <MessageSquare size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
                  <span className="text-slate-700 font-medium">Text</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-50 border border-gray-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 transition-all group">
                  <Video size={24} className="text-slate-700 group-hover:text-[#2b4d40]" />
                  <span className="text-slate-700 font-medium">Video</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}