import {
  HomeModernIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  UserIcon,
  IdentificationIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

export interface PropertyType {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
}

// Property types array
export const propertyTypes: PropertyType[] = [
  {
    id: 1,
    name: 'Single House Property',
    description: 'Single unit house for single family',
    icon: <HomeModernIcon className="h-5 w-5" />,
  },
  {
    id: 2,
    name: 'Apartments complex',
    description: 'Multiple unit house for families',
    icon: <BuildingOffice2Icon className="h-5 w-5" />,
  },
  {
    id: 3,
    name: 'Condominiums',
    description: 'Multiple unit house for families',
    icon: <BuildingOfficeIcon className="h-5 w-5" />,
  },
];

// Roles array
export const roles: Role[] = [
  {
    id: 1,
    name: 'Landlord',
    description: 'Owner of the property',
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    id: 2,
    name: 'Realtor',
    description: 'Manage property on behalf of owner',
    icon: <IdentificationIcon className="h-5 w-5" />,
  },
  {
    id: 3,
    name: 'Property management company',
    description: 'For management company',
    icon: <BuildingLibraryIcon className="h-5 w-5" />,
  },
];
