import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  note?: string;
}

export const InputField = ({
  label,
  name,
  type = 'text',
  required = false,
  placeholder = '',
  value,
  onChange,
  className = '',
  note,
}: InputFieldProps) => (
  <div className={`${className}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
    {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
  </div>
);
