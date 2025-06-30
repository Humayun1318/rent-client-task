import { useState } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import Modal from '../../ui/Modal';
import { InputField } from '../../ui/InputField';
import { DataCard } from '../DataCard/DataCard';

interface PetPolicyData {
  instutionType: string;
  distanceProperty: string;
  instutionName: string;
}

export const NearestEducation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policies, setPolicies] = useState<PetPolicyData[]>([]);
  const [currentPolicy, setCurrentPolicy] = useState<PetPolicyData>({
    instutionType: '',
    distanceProperty: '',
    instutionName: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPolicy = () => {
    setCurrentPolicy({
      instutionType: '',
      distanceProperty: '',
      instutionName: '',
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentPolicy.instutionType.trim()) {
      if (editingIndex !== null) {
        setPolicies((prev) =>
          prev.map((item, index) =>
            index === editingIndex ? currentPolicy : item
          )
        );
      } else {
        setPolicies((prev) => [...prev, currentPolicy]);
      }
      setIsModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setCurrentPolicy(policies[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setPolicies((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <SectionHeader
        title="Nearest instutional education"
        onAdd={handleAddPolicy}
        note="(Optional but recommended)"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add nearest instution`}
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField
              label="Educational Institutional type"
              name="instutionType"
              value={currentPolicy.instutionType}
              onChange={handleInputChange}
              required
              placeholder="High School"
            />
            <InputField
              label="Distance from property (Mile)"
              name="distanceProperty"
              type="text"
              value={currentPolicy.distanceProperty}
              onChange={handleInputChange}
              required
              placeholder="1.5"
            />
          </div>
          <div className="">
            <InputField
              label="Educational Institutional name"
              name="instutionName"
              type="text"
              value={currentPolicy.instutionName}
              onChange={handleInputChange}
              required
              placeholder="Enter Name"
            />
          </div>
        </div>
      </Modal>

      <div className="space-y-3">
        {policies.map((policy, index) => (
          <DataCard
            key={index}
            content={`
              Instution type: ${policy.instutionType}, distance from 
              ${policy.distanceProperty}, The instution name : ${policy.instutionName}
            `}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
};
