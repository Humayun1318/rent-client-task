import useProperty from '../../contexts/PropertyContext/useProperty';
import { propertyTypes, roles } from '../../data/selectionlist/selectionList';
import BoxCard from '../ui/BoxCard';

function SelectionLists() {
  const {
    selectedProperty,
    setSelectedProperty,
    selectedRole,
    setSelectedRole,
  } = useProperty();

  // console.log(selectedProperty, selectedRole);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Property type</h2>
        <div className="flex w-full gap-3 flex-wrap">
          {propertyTypes.map((type) => (
            <BoxCard
              key={type.id}
              icon={type.icon}
              title={type.name}
              description={type.description}
              className={`flex-1 hover:bg-gray-50 rounded 
                ${type.name === selectedProperty ? 'focus:ring-1 ring-1 ring-[#316EED] bg-[#F9FBFF]' : ''}`}
              onClick={() => {
                const newValue =
                  selectedProperty === type.name ? null : type.name;
                setSelectedProperty(newValue);
              }}
            ></BoxCard>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Select your role</h2>
        <div className="flex w-full gap-3 flex-wrap">
          {roles.map((role) => (
            <BoxCard
              key={role.id}
              icon={role.icon}
              title={role.name}
              description={role.description}
              className={`flex-1 hover:bg-gray-50 rounded 
                ${role.name === selectedRole ? 'focus:ring-1 ring-1 ring-[#316EED] bg-[#F9FBFF]' : ''}`}
              onClick={() => {
                const newValue = selectedRole === role.name ? null : role.name;
                setSelectedRole(newValue);
              }}
            ></BoxCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectionLists;
