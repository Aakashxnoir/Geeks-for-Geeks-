import { useState, useEffect } from 'react';
import { ShieldCheck, Search } from 'lucide-react';
import { CERTIFICATES, type CertificateRecord } from '../../data/communityMockData';

interface CertificateVerificationProps {
  /** Pre-fill certificate ID from global search (e.g. when user searches in Achievements view). */
  initialCertId?: string;
}

export default function CertificateVerification({ initialCertId = '' }: CertificateVerificationProps) {
  const [certId, setCertId] = useState(initialCertId);
  const [result, setResult] = useState<CertificateRecord | null | 'not_found'>(null);

  useEffect(() => {
    if (initialCertId != null) setCertId(initialCertId);
  }, [initialCertId]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const id = certId.trim().toUpperCase();
    if (!id) {
      setResult(null);
      return;
    }
    const cert = CERTIFICATES.find((c) => c.id.toUpperCase() === id);
    setResult(cert ?? 'not_found');
  };

  const clear = () => {
    setCertId('');
    setResult(null);
  };

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Certificate Verification
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Enter certificate ID to verify authenticity
        </p>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB]" />
            <input
              type="text"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder="e.g. GFG-RIT-2025-001"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#4B5563] bg-white dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] placeholder:text-[#6B7280] dark:placeholder:text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50 transition-colors"
              aria-label="Certificate ID"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#2F8D46] hover:bg-[#1F6B34] dark:hover:bg-[#1a5a2e] text-white font-medium transition-colors min-h-[44px]"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={clear}
              className="gfg-clear-btn px-4 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#F3F4F6] dark:bg-[#1c212e] text-[#1F2937] dark:text-[#FFFFFF] font-medium hover:bg-[#E5E7EB] dark:hover:bg-[#3d4a5c] transition-colors min-h-[44px]"
            >
              Clear
            </button>
          </div>
        </form>

        {result === 'not_found' && (
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm">
            No certificate found with this ID. Please check and try again.
          </div>
        )}

        {result && result !== 'not_found' && (
          <div className="p-4 rounded-xl border-2 border-[#2F8D46] dark:border-[#22C55E] bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] space-y-2">
            <div className="flex items-center gap-2 text-[#2F8D46] dark:text-[#22C55E] font-medium">
              <ShieldCheck className="w-5 h-5" />
              Verified
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-[#6B7280] dark:text-[#E5E7EB]">Certificate ID</dt>
                <dd className="font-mono font-medium text-[#1F2937] dark:text-[#FFFFFF]">{result.id}</dd>
              </div>
              <div>
                <dt className="text-[#6B7280] dark:text-[#E5E7EB]">Holder</dt>
                <dd className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{result.studentName}</dd>
              </div>
              <div>
                <dt className="text-[#6B7280] dark:text-[#E5E7EB]">Title</dt>
                <dd className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{result.title}</dd>
              </div>
              <div>
                <dt className="text-[#6B7280] dark:text-[#E5E7EB]">Skill</dt>
                <dd className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{result.skill}</dd>
              </div>
              <div>
                <dt className="text-[#6B7280] dark:text-[#E5E7EB]">Issued</dt>
                <dd className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{result.issuedDate}</dd>
              </div>
              <div>
                <dt className="text-[#6B7280] dark:text-[#E5E7EB]">Issuer</dt>
                <dd className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{result.issuer}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
