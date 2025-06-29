import { InputField } from './InputField';

interface AddressFieldsProps {
  prefix?: string;
  values: {
    identifier: string;
    aprtmentUnit: string;
    website: string;
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
    <div className="grid sm:grid-cols-2 md:grid-cols-3 md:gap-4 gap-2">
      <InputField
        label="Property name as identifier"
        name={`${prefix}identifier`}
        type="text"
        value={values.identifier}
        onChange={onInputChange}
        required
      />
      <InputField
        label="Total apartment unit"
        type="number"
        name={`${prefix}aprtmentUnit`}
        value={values.aprtmentUnit}
        onChange={onInputChange}
        required
      />
      <InputField
        label="Property website"
        name={`${prefix}website`}
        value={values.website}
        onChange={onInputChange}
      />
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
