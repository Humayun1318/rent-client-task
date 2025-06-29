import { FormSection } from '../FormSection/FormSection';
import { AddressFields } from '../ui/AddressFields';
import { CheckboxField } from '../ui/CheckboxField';
import { DocumentUpload } from '../ui/DocumentUpload';
import { InputField } from '../ui/InputField';

export const CompanyInfoForm = () => (
  <FormSection title="Company & office info">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <InputField label="Company name" name="companyName" required />
      <InputField
        label="Company identifier (EN/TRV)"
        name="companyIdentifier"
        required
      />
      <InputField label="Your job title" name="jobTitle" required />
      <DocumentUpload
        label="Agreement with landlord/owner"
        name="landlordAgreement"
        required
      />
    </div>

    <AddressFields prefix="company_" />

    <InputField label="Phone number" name="phone" type="tel" required />
    <InputField label="Contact email" name="email" type="email" required />

    <CheckboxField
      label="Accept RentYard property adding terms & conditions"
      name="termsAccepted"
      required
      className="mt-4"
    />
  </FormSection>
);
