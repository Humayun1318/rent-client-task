import { useState } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import Modal from '../../ui/Modal';
import { DataCard } from '../DataCard/DataCard';

interface FeeData {
  applicationFee: string;
  appliesTo: string;
  adminFee: string;
}

export const FeeInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fees, setFees] = useState<FeeData[]>([]);
  const [currentFee, setCurrentFee] = useState<FeeData>({
    applicationFee: '',
    appliesTo: 'All 18+ applicants',
    adminFee: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentFee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFee = () => {
    setCurrentFee({
      applicationFee: '',
      appliesTo: 'All 18+ applicants',
      adminFee: '',
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      setFees((prev) =>
        prev.map((item, index) => (index === editingIndex ? currentFee : item))
      );
    } else {
      setFees((prev) => [...prev, currentFee]);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setCurrentFee(fees[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setFees((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="Charges" required onAdd={handleAddFee} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Fee Information"
        onSubmit={handleSubmit}
        note="ⓘ Type 0 if charges not applicable"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application fee (one-time)*
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="applicationFee"
                  value={currentFee.applicationFee}
                  onChange={handleInputChange}
                  className="block w-full pl-7 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin fee (one-time)*
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="adminFee"
                  value={currentFee.adminFee}
                  onChange={handleInputChange}
                  className="block w-full pl-7 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="15"
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <div className="space-y-3">
        {fees.map((fee, index) => (
          <DataCard
            key={index}
            content={`Application fee: $${fee.applicationFee} (${fee.appliesTo}), Admin fee: $${fee.adminFee}`}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};
