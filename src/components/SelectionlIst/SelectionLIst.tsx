import { propertyTypes, roles } from '../../data/selectionlist/selectionList';
import BoxCard from '../ui/BoxCard';

function SelectionLists() {
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
              className="flex-1 hover:bg-gray-50 rounded"
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
              className="flex-1 hover:bg-gray-50 rounded"
            ></BoxCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectionLists;
