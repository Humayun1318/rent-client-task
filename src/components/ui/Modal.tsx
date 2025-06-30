import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  note?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Add',
  note = '',
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center rounded-2xl">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-60 bg-white rounded-2xl  w-full max-w-3xl shadow-2xl ">
        <div className="flex justify-between items-center bg-[#F4F4F4] text-[#6F6C6A] font-semibold p-3 rounded-t-2xl">
          <h3 className=" ">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form content - either from children or default input */}
        <div className="space-y-4 p-4">
          {children || (
            <div>
              <label className="block text-sm font-medium mb-1">Details</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter details`}
              />
            </div>
          )}
        </div>

        <div className=" border-t border-gray-200  flex justify-between items-center p-4">
          {onSubmit && (
            <>
              <span>{`${note}`}</span>
              <button
                onClick={onSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {submitText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
