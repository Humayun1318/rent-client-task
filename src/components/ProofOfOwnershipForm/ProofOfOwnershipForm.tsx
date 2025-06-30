import React from 'react';
import { FormSection } from '../FormSection/FormSection';
import { DocumentUpload } from '../ui/DocumentUpload';
import { CheckboxField } from '../ui/CheckboxField';
// import { FormSection, DocumentUpload, CheckboxField } from './form-components';

interface ProofOfOwnershipFormProps {
  ownershipDoc: File | null;
  termsAccepted: boolean;
  onFileChange: (name: string, file: File | null) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProofOfOwnershipForm = ({
  termsAccepted,
  onFileChange,
  onInputChange,
}: ProofOfOwnershipFormProps) => (
  <>
    <FormSection
      title="Proof of ownership"
      className="w-full lg:w-1/3 max-w-md"
    >
      <DocumentUpload
        label="Ownership doc"
        name="ownershipDoc"
        note="(Pdf only)"
        required
        onChange={(e) =>
          onFileChange('ownershipDoc', e.target.files?.[0] || null)
        }
      />
    </FormSection>
    <CheckboxField
      label="Accept RentYard property adding terms & conditions"
      name="ownershipTermsAccepted"
      checked={termsAccepted}
      onChange={onInputChange}
      required
    />
  </>
);
