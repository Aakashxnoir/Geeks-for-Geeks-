import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  /** Controlled: when provided, expanded state is controlled by parent */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export default function CollapsibleSection({
  id,
  title,
  subtitle,
  icon,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  children,
  className = '',
  headerClassName = '',
}: CollapsibleSectionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  const setExpanded = (value: boolean) => {
    if (!isControlled) setInternalExpanded(value);
    onExpandedChange?.(value);
  };

  return (
    <section
      id={id}
      className={`gfg-collapsible rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#F9FAFB] dark:bg-[#141922] dark:shadow-lg overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={`gfg-collapsible-header w-full px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3 text-left hover:bg-[#E5E7EB] dark:hover:bg-[rgba(34,197,94,0.12)] transition-colors duration-200 border-b border-[#E5E7EB] dark:border-[#3d4a5c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46] dark:focus-visible:ring-[#22C55E] focus-visible:ring-inset ${headerClassName}`}
        aria-expanded={expanded}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#2F8D46] dark:text-[#22C55E]">
            {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </span>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#E5E7EB] truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <span className="text-xs text-[#6B7280] dark:text-[#E5E7EB] flex-shrink-0">
          {expanded ? 'Click to collapse' : 'Click to expand'}
        </span>
      </button>
      <div
        id={`${id}-content`}
        role="region"
        aria-hidden={!expanded}
        className={`gfg-collapsible-content ${expanded ? 'block' : 'hidden'} ${expanded ? 'min-h-[120px] bg-[#F9FAFB] dark:bg-[#0d1117]' : ''}`}
      >
        {children}
      </div>
    </section>
  );
}
