import { useState, type ReactNode } from 'react';
import { PropertyContext } from './PropertyContext';

const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [getStartedBtn, setGetStartedBtn] = useState<boolean>(false);
  const [pricing, setPricing] = useState<number>(0);

  return (
    <PropertyContext.Provider
      value={{
        selectedProperty,
        selectedRole,
        setSelectedProperty,
        setSelectedRole,
        getStartedBtn,
        setGetStartedBtn,
        pricing,
        setPricing,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyProvider;
