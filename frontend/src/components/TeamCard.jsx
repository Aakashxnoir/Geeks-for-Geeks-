const TeamCard = ({ name, role, roleIcon, deptYear, bio }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2F8D46&color=fff&size=256`;
  const isFaculty = role === 'Faculty Advisor';

  return (
    <article className="p-4 rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#F9FAFB] dark:bg-[#0d1117] hover:border-[#2F8D46] dark:hover:border-[#22C55E] transition-colors text-center">
      <div className="flex justify-center mb-3">
        <img
          src={avatarUrl}
          alt=""
          width="100"
          height="100"
          loading="lazy"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#E5E7EB] dark:border-[#3d4a5c]"
        />
      </div>
      <h3 className="text-sm font-bold text-[#1F2937] dark:text-[#FFFFFF]">{name}</h3>
      <p className="text-xs text-[#2F8D46] dark:text-[#22C55E] font-medium mt-0.5 flex items-center justify-center gap-1">
        {roleIcon && <span aria-hidden>{roleIcon}</span>}
        {role}
      </p>
      <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-1">{deptYear}</p>
      <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-2">{bio}</p>
      <div className="flex justify-center gap-2 mt-3" aria-label="Social links">
        <a href="#" className="text-xs font-medium text-[#2F8D46] dark:text-[#22C55E] hover:underline">GitHub</a>
        <a href="#" className="text-xs font-medium text-[#2F8D46] dark:text-[#22C55E] hover:underline">LinkedIn</a>
      </div>
    </article>
  );
};

export default TeamCard;
