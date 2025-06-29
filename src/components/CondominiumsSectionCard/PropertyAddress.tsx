import { useState } from 'react';
import { SectionHeader } from '../Condominiums/SectionHeader/SectionHeader';
import Modal from '../ui/Modal';
import { AddressFields } from '../ui/AddressFields';
import { DataCard } from '../DataCard/DataCard';

interface AddressData {
  identifier: string;
  aprtmentUnit: string;
  website: string;
  country: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
}

export const CondominiumsSectionCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressDatas, setAddressDatas] = useState<AddressData[]>([]);
  const [address, setAddress] = useState<AddressData>({
    identifier: '',
    aprtmentUnit: '',
    website: '',
    country: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSection = () => {
    setAddress({
      identifier: '',
      aprtmentUnit: '',
      website: '',
      country: '',
      street: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      // Update existing entry
      setAddressDatas((prev) =>
        prev.map((item, index) => (index === editingIndex ? address : item))
      );
    } else {
      // Add new entry
      setAddressDatas((prev) => [...prev, address]);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setAddress(addressDatas[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setAddressDatas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <SectionHeader
        title="Property address"
        required
        onAdd={handleAddSection}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Property address"
        onSubmit={handleSubmit}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <AddressFields values={address} onInputChange={handleInputChange} />
        </form>
      </Modal>
      <div className="space-y-3 ">
        {addressDatas.map((ad, index) => (
          <DataCard
            key={index}
            content={`${ad.identifier}, ${ad.aprtmentUnit}, ${ad.website}, 
            ${ad.country}, ${ad.street}, ${ad.apt}, ${ad.city}, ${ad.state}, ${ad.zip}`}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
};
