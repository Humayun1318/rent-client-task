import React from 'react';

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const CheckboxField = ({
  label,
  name,
  checked = false,
  onChange,
  required = false,
  className = '',
}: CheckboxFieldProps) => (
  <div className={`flex items-center ${className}`}>
    <label className="ml-2 flex items-center gap-3 text-sm text-gray-700">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />

      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  </div>
);
