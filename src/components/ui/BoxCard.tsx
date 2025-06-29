interface SimpleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

const BoxCard = ({
  icon,
  title,
  description,
  className = '',
  onClick,
}: SimpleCardProps) => {
  return (
    <div
      className={`flex items-center gap-3 p-5 border border-gray-200 rounded-xl ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="rounded-2xl p-3 bg-[#F9FBFF]">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm font-medium text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default BoxCard;
