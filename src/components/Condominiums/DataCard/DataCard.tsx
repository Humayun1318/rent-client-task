import {
  PencilSquareIcon,
  TrashIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

interface ContentCardProps {
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  note?: string;
  cardIcon?: boolean;
}

export const DataCard = ({
  content,
  onEdit,
  onDelete,
  note = '',
  className = '',
  cardIcon = false,
}: ContentCardProps) => {
  return (
    <div
      className={`flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 ${className}`}
    >
      {/* Content */}
      <p className="text-gray-700 flex-1 pr-4">
        {cardIcon === true ? (
          <span className="flex items-center gap-3">
            <CreditCardIcon className="h-4 w-4"></CreditCardIcon>
            {content} <span className="text-[#6F6C6A]">{note}</span>
          </span>
        ) : (
          <span>
            {content} <span className="text-[#6F6C6A]">{note}</span>
          </span>
        )}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            aria-label="Edit"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5  text-red-600 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
