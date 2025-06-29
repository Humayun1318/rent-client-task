import { FormSection } from '../FormSection/FormSection';
import { CheckboxField } from '../ui/CheckboxField';
import { DocumentUpload } from '../ui/DocumentUpload';
import { InputField } from '../ui/InputField';

interface CompanyInfoFormProps {
  companyName: string;
  companyIdentifier: string;
  jobTitle: string;
  landlordAgreement: File | null;
  address: {
    country: string;
    street: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  termsAccepted: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (name: string, file: File | null) => void;
}

export const CompanyInfoForm = ({
  companyName,
  companyIdentifier,
  jobTitle,
  address,
  phone,
  email,
  termsAccepted,
  onInputChange,
  onFileChange,
}: CompanyInfoFormProps) => {
  return (
    <>
      <FormSection title="Company & office info" className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <InputField
            label="Company name"
            name="companyName"
            value={companyName}
            onChange={onInputChange}
            required
          />
          <InputField
            label="Company identifier (EN/TRV)"
            name="companyIdentifier"
            value={companyIdentifier}
            onChange={onInputChange}
            required
          />
          <InputField
            label="Your job title"
            name="jobTitle"
            value={jobTitle}
            onChange={onInputChange}
            required
          />
          <DocumentUpload
            label="Agreement with landlord/owner"
            name="companyLandlordAgreement"
            onChange={(e) =>
              onFileChange(
                'companyLandlordAgreement',
                e.target.files?.[0] || null
              )
            }
            required
          />

          <InputField
            label="Country/Region"
            name="companyAddress_country"
            value={address.country}
            onChange={onInputChange}
            required
          />
          <InputField
            label="Street address"
            name="companyAddress_street"
            value={address.street}
            onChange={onInputChange}
            required
          />
          <InputField
            label="Apt, suite, unit (if applicable)"
            name="companyAddress_apt"
            value={address.apt}
            onChange={onInputChange}
          />
          <InputField
            label="City/Town"
            name="companyAddress_city"
            value={address.city}
            onChange={onInputChange}
            required
          />
          <InputField
            label="State/Territory"
            name="companyAddress_state"
            value={address.state}
            onChange={onInputChange}
            required
          />
          <InputField
            label="Zip code"
            name="companyAddress_zip"
            value={address.zip}
            onChange={onInputChange}
            required
          />

          <InputField
            label="Phone number"
            name="phone"
            type="tel"
            value={phone}
            onChange={onInputChange}
            required
          />
          <InputField
            label="Contact email"
            name="email"
            type="email"
            value={email}
            onChange={onInputChange}
            required
          />
        </div>
      </FormSection>
      <CheckboxField
        label="Accept RentYard property adding terms & conditions"
        name="companyTermsAccepted"
        checked={termsAccepted}
        onChange={onInputChange}
        required
        className="mt-4"
      />
    </>
  );
};
