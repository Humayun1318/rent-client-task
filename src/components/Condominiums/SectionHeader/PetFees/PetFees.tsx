import { useState } from 'react';
import { SectionHeader } from '../SectionHeader';
import Modal from '../../../ui/Modal';
import { InputField } from '../../../ui/InputField';
import { DataCard } from '../../DataCard/DataCard';

interface PetPolicyData {
  petType: string;
  oneTimeFee: string;
  maxWeight: string;
  securityDeposit: string;
  monthlyRent: string;
}

export const PetFees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policies, setPolicies] = useState<PetPolicyData[]>([]);
  const [currentPolicy, setCurrentPolicy] = useState<PetPolicyData>({
    petType: '',
    oneTimeFee: '',
    maxWeight: '',
    securityDeposit: '',
    monthlyRent: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPolicy = () => {
    setCurrentPolicy({
      petType: '',
      oneTimeFee: '',
      maxWeight: '',
      securityDeposit: '',
      monthlyRent: '',
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentPolicy.petType.trim()) {
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
        title="Pet Policy"
        onAdd={handleAddPolicy}
        note="(Optional, add fees if you allow pet)"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Pet Fees`}
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField
              label="Pet type"
              name="petType"
              value={currentPolicy.petType}
              onChange={handleInputChange}
              required
              placeholder="Select"
            />
            <InputField
              label="Max weight (LB)"
              name="maxWeight"
              type="text"
              value={currentPolicy.maxWeight}
              onChange={handleInputChange}
              required
              placeholder="100"
            />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <InputField
              label="One time pet fee"
              name="oneTimeFee"
              type="text"
              value={currentPolicy.oneTimeFee}
              onChange={handleInputChange}
              required
              placeholder="$100"
            />

            <InputField
              label="Pet Security Deposit"
              name="securityDeposit"
              type="text"
              value={currentPolicy.securityDeposit}
              onChange={handleInputChange}
              required
              placeholder="$100"
            />

            <InputField
              label="Monthly pet rent"
              name="monthlyRent"
              type="text"
              value={currentPolicy.monthlyRent}
              onChange={handleInputChange}
              required
              placeholder="$100"
            />
          </div>
        </div>
      </Modal>

      <div className="space-y-3">
        {policies.map((policy, index) => (
          <DataCard
            key={index}
            content={`
              Pet Type: ${policy.petType} | 
              Fee: ${policy.oneTimeFee} | 
              Weight: ${policy.maxWeight}LB | 
              Deposit: ${policy.securityDeposit} | 
              Rent: ${policy.monthlyRent}/mo
            `}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
};
