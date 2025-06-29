import { InputField } from './InputField';

interface AddressFieldsProps {
  prefix?: string;
  values: {
    country: string;
    street: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
  };
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressFields = ({
  prefix = '',
  values,
  onInputChange,
}: AddressFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <InputField
        label="Country/Region"
        name={`${prefix}country`}
        value={values.country}
        onChange={onInputChange}
        required
      />
      <InputField
        label="Street address"
        name={`${prefix}street`}
        value={values.street}
        onChange={onInputChange}
        required
      />
      <InputField
        label="Apt, suite, unit (if applicable)"
        name={`${prefix}apt`}
        value={values.apt}
        onChange={onInputChange}
      />
      <InputField
        label="City/Town"
        name={`${prefix}city`}
        value={values.city}
        onChange={onInputChange}
        required
      />
      <InputField
        label="State/Territory"
        name={`${prefix}state`}
        value={values.state}
        onChange={onInputChange}
        required
      />
      <InputField
        label="Zip code"
        name={`${prefix}zip`}
        value={values.zip}
        onChange={onInputChange}
        required
      />
    </div>
  );
};
