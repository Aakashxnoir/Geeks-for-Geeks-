import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AchievementUnlockProps {
  badgeName: string;
  onDismiss?: () => void;
  autoHideMs?: number;
}

/** Mock achievement unlock toast — can be triggered by parent (e.g. on visit or button). */
export default function AchievementUnlock({
  badgeName,
  onDismiss,
  autoHideMs = 3500,
}: AchievementUnlockProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, autoHideMs);
    return () => clearTimeout(t);
  }, [autoHideMs, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-16 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[100] flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#141922] shadow-lg transition-colors duration-200"
          role="alert"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#2F8D46] dark:text-[#22C55E]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#6B7280] dark:text-[#E5E7EB] uppercase tracking-wide">Achievement Unlocked</p>
            <p className="font-semibold text-[#1F2937] dark:text-[#FFFFFF] truncate">{badgeName}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
