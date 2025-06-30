import { ProofOfOwnershipForm } from '../ProofOfOwnershipForm/ProofOfOwnershipForm';
import useProperty from '../../contexts/PropertyContext/useProperty';
import { useEffect, useState } from 'react';
import { RealtorVerificationForm } from '../RealtorVerificationForm/RealtorVerificationForm';
import { CompanyInfoForm } from '../CompanyInfoForm/CompanyInfoForm';

interface FormData {
  // Proof of Ownership
  ownershipDoc: File | null;
  ownershipTermsAccepted: boolean;

  // Realtor Verification
  licenseNumber: string;
  realtorAdditionalDocs: File | null;
  realtorLandlordAgreement: File | null;
  realtorTermsAccepted: boolean;

  // Company Info
  companyName: string;
  companyIdentifier: string;
  jobTitle: string;
  companyLandlordAgreement: File | null;
  companyAddress: {
    country: string;
    street: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  companyTermsAccepted: boolean;
}

const PropertyManagementForm = () => {
  const [formData, setFormData] = useState<FormData>({
    ownershipDoc: null,
    ownershipTermsAccepted: false,
    licenseNumber: '',
    realtorAdditionalDocs: null,
    realtorLandlordAgreement: null,
    realtorTermsAccepted: false,
    companyName: '',
    companyIdentifier: '',
    jobTitle: '',
    companyLandlordAgreement: null,
    companyAddress: {
      country: '',
      street: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
    },
    phone: '',
    email: '',
    companyTermsAccepted: false,
  });

  const { selectedProperty, selectedRole, setGetStartedBtn } = useProperty();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Handle nested address fields
    if (name.startsWith('companyAddress_')) {
      const fieldName = name.split('_')[1];
      setFormData((prev) => ({
        ...prev,
        companyAddress: {
          ...prev.companyAddress,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (
      (formData.ownershipDoc &&
        formData.ownershipTermsAccepted &&
        selectedRole === 'Landlord') ||
      (formData.licenseNumber &&
        formData.realtorLandlordAgreement &&
        formData.realtorTermsAccepted &&
        selectedRole === 'Realtor') ||
      (formData.companyName &&
        formData.companyIdentifier &&
        formData.jobTitle &&
        formData.companyLandlordAgreement &&
        formData.companyTermsAccepted) ||
      (formData.companyName &&
        formData.companyIdentifier &&
        formData.jobTitle &&
        formData.companyLandlordAgreement &&
        formData.companyAddress.country &&
        formData.companyAddress.street &&
        formData.companyAddress.city &&
        formData.companyAddress.state &&
        formData.companyAddress.zip &&
        formData.phone &&
        formData.email &&
        formData.companyTermsAccepted &&
        selectedRole === 'Property management company')
    ) {
      setGetStartedBtn(true);
    } else {
      setGetStartedBtn(false);
    }
  }, [selectedRole, formData, setGetStartedBtn]);

  return (
    <form onSubmit={handleSubmit} className="my-8">
      {selectedProperty === 'Condominiums' && selectedRole === 'Landlord' && (
        <ProofOfOwnershipForm
          ownershipDoc={formData.ownershipDoc}
          termsAccepted={formData.ownershipTermsAccepted}
          onFileChange={handleFileChange}
          onInputChange={handleInputChange}
        />
      )}

      {selectedProperty === 'Condominiums' && selectedRole === 'Realtor' && (
        <RealtorVerificationForm
          licenseNumber={formData.licenseNumber}
          additionalDocs={formData.realtorAdditionalDocs}
          landlordAgreement={formData.realtorLandlordAgreement}
          realtorTermsAccepted={formData.realtorTermsAccepted}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
        />
      )}

      {selectedProperty === 'Condominiums' &&
        selectedRole === 'Property management company' && (
          <CompanyInfoForm
            companyName={formData.companyName}
            companyIdentifier={formData.companyIdentifier}
            jobTitle={formData.jobTitle}
            landlordAgreement={formData.companyLandlordAgreement}
            address={formData.companyAddress}
            phone={formData.phone}
            email={formData.email}
            termsAccepted={formData.companyTermsAccepted}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
          />
        )}

      <button type="submit" className={`p-4 bg-blue-500 hidden`}>
        Submit Application
      </button>
    </form>
  );
};

export default PropertyManagementForm;
