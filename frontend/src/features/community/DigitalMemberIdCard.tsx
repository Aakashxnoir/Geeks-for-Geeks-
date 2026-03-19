import { useMemo, useState } from 'react';
import { CreditCard, QrCode } from 'lucide-react';
import { STUDENTS } from '../../utils/data/communityMockData';

function MockQR() {
  return (
    <div className="gfg-id-qr w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#1F2937] dark:border-[#3d4a5c] rounded-lg flex items-center justify-center bg-[#F9FAFB] dark:bg-[#0d1117]">
      <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-[#1F2937] dark:text-[#FFFFFF]" />
    </div>
  );
}

export default function DigitalMemberIdCard() {
  const [selectedId, setSelectedId] = useState(STUDENTS[0].id);
  const member = useMemo(() => STUDENTS.find((s) => s.id === selectedId), [selectedId]);

  if (!member) return null;

  const membershipId = `GFG-RIT-${member.department}-${member.rollNumber}`;

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Digital Member ID
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Virtual membership card
        </p>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#6B7280] dark:text-[#E5E7EB] mb-2">Select member</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50"
          >
            {STUDENTS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="gfg-id-card-inner rounded-xl border-2 border-[#E5E7EB] dark:border-[#3d4a5c] p-5 bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6] dark:from-[#1c212e] dark:to-[#0d1117] max-w-sm mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#6B7280] dark:text-[#E5E7EB] uppercase tracking-wide">GeeksforGeeks Campus Club</p>
              <p className="text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mt-1 truncate">{member.name}</p>
              <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">{member.department} · Year {member.year}</p>
              <p className="font-mono text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-2">{membershipId}</p>
              <span
                className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  member.statusBadge === 'core' ? 'bg-[#2F8D46] dark:bg-[#22C55E] text-white' :
                  member.statusBadge === 'active' ? 'bg-[#57B46E] dark:bg-[#22C55E] dark:text-[#052E16] text-white' :
                  member.statusBadge === 'volunteer' ? 'bg-[#1F6B34] dark:bg-[#16A34A] text-white' :
                  'bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]'
                }`}
              >
                {member.statusBadge}
              </span>
            </div>
            <div className="shrink-0">
              <MockQR />
            </div>
          </div>
          <p className="text-[10px] text-[#6B7280] dark:text-[#E5E7EB] mt-4 text-center">
            Rajalakshmi Institute of Technology (RIT)
          </p>
        </div>
      </div>
    </section>
  );
}

