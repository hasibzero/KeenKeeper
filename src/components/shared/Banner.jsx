import { Plus } from 'lucide-react';

export default function Banner() {
  return (
    <section className="w-full bg-slate-100 py-24 px-6 flex flex-col items-center text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-[44px] font-bold text-slate-800 mb-5 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-slate-500 text-[17px] md:text-lg max-w-2xl mb-10 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="flex items-center space-x-2 bg-[#2b4d40] text-white px-6 py-3 rounded-md font-medium transition-colors hover:bg-[#1e382e]">
          <Plus size={18} strokeWidth={2.5} />
          <span>Add a Friend</span>
        </button>
      </div>
    </section>
  );
}