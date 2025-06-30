import { useState } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import Modal from '../../ui/Modal';
import { InputField } from '../../ui/InputField';
import { DataCard } from '../DataCard/DataCard';

interface PetPolicyData {
  instutionType: string;
  instutionName: string;
}

export const UtilityProvider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policies, setPolicies] = useState<PetPolicyData[]>([]);
  const [currentPolicy, setCurrentPolicy] = useState<PetPolicyData>({
    instutionType: '',
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
        title="Utility provider"
        onAdd={handleAddPolicy}
        note="(Optional but recommended)"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Utilities provider`}
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField
              label="Utility type"
              name="instutionType"
              value={currentPolicy.instutionType}
              onChange={handleInputChange}
              required
              placeholder="Select"
            />
            <InputField
              label="Provider company name"
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
              ${policy.instutionType},  ${policy.instutionName}
            `}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
};
