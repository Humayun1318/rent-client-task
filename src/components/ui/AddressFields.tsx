import React from 'react';
import { InputField } from './InputField';

interface AddressFieldsProps {
  prefix?: string;
  values?: {
    country?: string;
    street?: string;
    apt?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  onChange?: (name: string, value: string) => void;
}

export const AddressFields = ({
  prefix = '',
  values = {},
  onChange,
}: AddressFieldsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.name, e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Country/Region"
        name={`${prefix}country`}
        value={values.country}
        onChange={handleChange}
        required
      />
      <InputField
        label="Street address"
        name={`${prefix}street`}
        value={values.street}
        onChange={handleChange}
        required
      />
      <InputField
        label="Apt, suite, unit (if applicable)"
        name={`${prefix}apt`}
        value={values.apt}
        onChange={handleChange}
      />
      <InputField
        label="City/Town"
        name={`${prefix}city`}
        value={values.city}
        onChange={handleChange}
        required
      />
      <InputField
        label="State/Territory"
        name={`${prefix}state`}
        value={values.state}
        onChange={handleChange}
        required
      />
      <InputField
        label="Zip code"
        name={`${prefix}zip`}
        value={values.zip}
        onChange={handleChange}
        required
      />
    </div>
  );
};
