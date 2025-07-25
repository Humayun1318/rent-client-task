export interface PropertyContextState {
  selectedProperty: string | null;
  selectedRole: string | null;
  setSelectedProperty: (type: string | null) => void;
  setSelectedRole: (role: string | null) => void;
  setGetStartedBtn: (value: boolean) => void;
  setPricing: (value: number) => void;
  getStartedBtn: boolean;
  pricing: number;
}
