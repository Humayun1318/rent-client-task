import { CondominiumsSectionCard } from '../components/CondominiumsSectionCard/PropertyAddress';

const CondominiumsInfo = () => {
  return (
    <div className="relative">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        Condominiums Information
      </h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {/* {condominiumSections.map((section) => (
          <CondominiumsSectionCard
            key={section.id}
            title={section.title}
            status={section.status}
            onAdd={() => handleAddSection(section.title)}
          />
        ))} */}
        <div className="p-3 border border-gray-200 rounded-lg">
          <CondominiumsSectionCard />
        </div>
      </div>
    </div>
  );
};

export default CondominiumsInfo;
