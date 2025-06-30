import React from 'react';
import { FormSection } from '../FormSection/FormSection';
import { InputField } from '../ui/InputField';
import { DocumentUpload } from '../ui/DocumentUpload';
import { CheckboxField } from '../ui/CheckboxField';

interface RealtorVerificationFormProps {
  licenseNumber: string;
  additionalDocs: File | null;
  landlordAgreement: File | null;
  realtorTermsAccepted: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (name: string, file: File | null) => void;
}

export const RealtorVerificationForm = ({
  licenseNumber,
  realtorTermsAccepted,
  onInputChange,
  onFileChange,
}: RealtorVerificationFormProps) => (
  <>
    <FormSection
      title="Realtor verification"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <InputField
        label="License number"
        type="number"
        name="licenseNumber"
        placeholder="0000000000000"
        value={licenseNumber}
        onChange={onInputChange}
        required
      />
      <DocumentUpload
        label="Additional documents for realtor"
        name="realtorAdditionalDocs"
        note="(PDF only)"
        onChange={(e) =>
          onFileChange('realtorAdditionalDocs', e.target.files?.[0] || null)
        }
      />
      <DocumentUpload
        label="Agreement with landlord"
        name="realtorLandlordAgreement"
        onChange={(e) =>
          onFileChange('realtorLandlordAgreement', e.target.files?.[0] || null)
        }
        required
      />
    </FormSection>
    <CheckboxField
      label="Accept RentYard terms & conditions"
      name="realtorTermsAccepted"
      checked={realtorTermsAccepted}
      onChange={onInputChange}
      required
      className="mt-4"
    />
  </>
);
