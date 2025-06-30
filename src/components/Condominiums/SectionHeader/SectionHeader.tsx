import { PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
interface SectionHeaderProps {
  title: string;
  required?: boolean;
  onAdd?: () => void;
  note?: string;
}

export const SectionHeader = ({
  title,
  required = false,
  onAdd,
  note = '',
}: SectionHeaderProps) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 mb-3">
    <h3 className="font-medium text-gray-800 ">
      {title}
      {required ? (
        <span className="text-[#FF6A62] ml-1">{`(Required)`}</span>
      ) : (
        <span className="text-[#6F6C6A]">{note}</span>
      )}
    </h3>
    {onAdd && (
      <button
        type="button"
        onClick={onAdd}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
      >
        <PlusIcon className="h-4 w-4 mr-1" />
        Add
      </button>
    )}
  </div>
);
