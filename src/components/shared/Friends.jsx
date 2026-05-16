import FriendsCard from './FriendsCard';
import friendsData from '../../assets/data.json'; 

export default function Friends() {
  // --- DYNAMIC STATS CALCULATIONS ---
  
  const totalFriends = friendsData.length;
  
  const onTrackCount = friendsData.filter(
    (friend) => friend.status === 'On-Track'
  ).length;
  
  const needAttentionCount = friendsData.filter(
    (friend) => friend.status === 'Overdue' || friend.status === 'Almost Due'
  ).length;

  // Calculates interactions in the last 30 days based on the "lastSeen" string (e.g., "62d ago")
  const interactionsThisMonth = friendsData.filter((friend) => {
    // Extracts the first number found in the string
    const daysAgo = parseInt(friend.lastSeen.match(/\d+/)[0], 10); 
    return daysAgo <= 30;
  }).length;

  // ----------------------------------

  return (
    <div className="w-full bg-slate-100 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Stats Row (Now Dynamic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-[#2b4d40] mb-2">
              {totalFriends}
            </span>
            <span className="text-slate-400 text-sm font-medium">Total Friends</span>
          </div>
          
          <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-[#2b4d40] mb-2">
              {onTrackCount}
            </span>
            <span className="text-slate-400 text-sm font-medium">On Track</span>
          </div>
          
          <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-[#2b4d40] mb-2">
              {needAttentionCount}
            </span>
            <span className="text-slate-400 text-sm font-medium">Need Attention</span>
          </div>
          
          <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-[#2b4d40] mb-2">
              {interactionsThisMonth}
            </span>
            <span className="text-slate-400 text-sm font-medium text-center">Interactions This Month</span>
          </div>
        </div>

        {/* Header Row */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-800">Your Friends</h2>
        </div>

        {/* Friend Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friendsData.map((friend) => (
            <FriendsCard key={friend.id} friend={friend} />
          ))}
        </div>

      </div>
    </div>
  );
}