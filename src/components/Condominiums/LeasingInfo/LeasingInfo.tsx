import { useState } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import Modal from '../../ui/Modal';
import { DataCard } from '../DataCard/DataCard';

interface LeasingManagerData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  usePropertyAddress: boolean;
}

export const LeasingInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [managers, setManagers] = useState<LeasingManagerData[]>([]);
  const [currentManager, setCurrentManager] = useState<LeasingManagerData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+880',
    usePropertyAddress: false,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentManager((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddManager = () => {
    setCurrentManager({
      name: '',
      email: '',
      phone: '',
      countryCode: '+880',
      usePropertyAddress: false,
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      setManagers((prev) =>
        prev.map((item, index) =>
          index === editingIndex ? currentManager : item
        )
      );
    } else {
      setManagers((prev) => [...prev, currentManager]);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setCurrentManager(managers[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setManagers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="Leasing Info" required onAdd={handleAddManager} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Leasing Manager"
        onSubmit={handleSubmit}
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
                Leasing manager name*
              </label>
              <input
                type="text"
                name="name"
                value={currentManager.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leasing manager Phone number*
              </label>
              <div className="relative rounded-md ">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <select
                    name="countryCode"
                    className="h-full py-0 pl-3 pr-7 border-transparent bg-transparent
                     text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 rounded-l-md"
                  >
                    <option>+880</option>
                    <option>+1</option>
                    <option>+44</option>
                    {/* Add more country codes as needed */}
                  </select>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={currentManager.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leasing manager email*
              </label>
              <input
                type="email"
                name="email"
                value={currentManager.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="usePropertyAddress"
                name="usePropertyAddress"
                checked={currentManager.usePropertyAddress}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="usePropertyAddress"
                className="ml-2 block text-sm text-gray-700"
              >
                Address (same as property)
              </label>
            </div>
          </div>
        </form>
      </Modal>

      <div className="space-y-3">
        {managers.map((manager, index) => (
          <DataCard
            key={index}
            content={`${manager.name}, ${manager.email}, ${manager.phone}`}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
            note={`${manager.usePropertyAddress ? `Address(Same as property)` : 'Different address'}`}
          />
        ))}
      </div>
    </div>
  );
};
