import Link from 'next/link';
import Image from 'next/image';

export default function FriendsCard({ friend }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Overdue':
        return 'bg-[#ef4444] text-white';
      case 'Almost Due':
        return 'bg-[#f59e0b] text-white';
      case 'On-Track':
        return 'bg-[#2b4d40] text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Link href={`/friend/${friend.id}`} className="block">
      <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer h-full">
      <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-gray-200 relative">
        <img
          src={friend.avatarUrl}
          alt={friend.name}
          className="object-cover w-full h-full"
        />
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-1">
        {friend.name}
      </h3>
      
      <span className="text-xs text-slate-500 mb-4">
        {friend.lastSeen}
      </span>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {friend.tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-[#dcfce7] text-[#166534] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className={`text-[11px] font-bold px-4 py-1.5 rounded-full ${getStatusStyle(friend.status)}`}>
        {friend.status}
      </div>
      </div>
    </Link>
  );
}
