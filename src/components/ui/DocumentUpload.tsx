import React, { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';


interface DocumentUploadProps {
  label: string;
  name: string;
  required?: boolean;
  note?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DocumentUpload = ({
  label,
  name,
  required = false,
  note = '(Pdf only)',
  onChange,
}: DocumentUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.name) {
      setFileName(file.name);
    }
    onChange?.(e);
  };

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-800 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <label
        htmlFor={name}
        className="flex justify-center items-center w-full h-12 cursor-pointer border 
        border-dashed border-gray-300 rounded-lg bg-[#F4F4F4] hover:bg-gray-100 transition"
      >
        {!fileName ? (
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span>{note}</span>
          </div>
        ) : (
          <div className="text-sm text-gray-800 font-medium truncate px-2">
            {fileName}
          </div>
        )}
        <input
          type="file"
          accept="application/pdf"
          id={name}
          name={name}
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
