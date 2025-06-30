import { createContext } from 'react';
import type { PropertyContextState } from './context.types';

// Create context
export const PropertyContext = createContext<PropertyContextState>({
  selectedProperty: null,
  selectedRole: null,
  setSelectedProperty: () => {},
  setSelectedRole: () => {},
  setGetStartedBtn: () => {},
  setPricing: () => {},
  getStartedBtn: false,
  pricing: 0,
});
