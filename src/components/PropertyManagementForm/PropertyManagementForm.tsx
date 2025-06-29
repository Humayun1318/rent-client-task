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
    // Proof of Ownership
    ownershipDoc: null,
    ownershipTermsAccepted: false,

    // Realtor Verification
    licenseNumber: '',
    realtorAdditionalDocs: null,
    realtorLandlordAgreement: null,
    realtorTermsAccepted: false,

    // Company Info
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

  const { selectedProperty, selectedRole, setGetStartedBtn, getStartedBtn } =
    useProperty();

  // Handle regular input changes
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

  // Handle file uploads
  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your API
  };

  useEffect(() => {
    if (
      (formData.ownershipDoc && formData.ownershipTermsAccepted) ||
      (formData.licenseNumber &&
        formData.realtorLandlordAgreement &&
        formData.realtorTermsAccepted)
    ) {
      setGetStartedBtn(true);
    } else {
      setGetStartedBtn(false); // optional: reset if not satisfied
    }
  }, [
    formData.ownershipDoc,
    formData.ownershipTermsAccepted,
    formData.licenseNumber,
    formData.realtorLandlordAgreement,
    formData.realtorTermsAccepted,
    setGetStartedBtn,
  ]);

  return (
    <form onSubmit={handleSubmit} className="my-8">
      {/* Proof of Ownership */}
      {selectedProperty === 'Condominiums' && selectedRole === 'Landlord' && (
        <ProofOfOwnershipForm
          ownershipDoc={formData.ownershipDoc}
          termsAccepted={formData.ownershipTermsAccepted}
          onFileChange={handleFileChange}
          onInputChange={handleInputChange}
        />
      )}

      {/* Realtor Vrrification */}
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

      {/* Company information */}
      {selectedProperty === 'Condominiums' && selectedRole === 'Realtor' && (
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

      <button type="submit" className={`p-4 bg-blue-500`}>
        Submit Application
      </button>
    </form>
  );
};

export default PropertyManagementForm;
