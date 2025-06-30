import { useState } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import Modal from '../../ui/Modal';
import { DataCard } from '../DataCard/DataCard';
import { DocumentUpload } from '../../ui/DocumentUpload';
import { CheckboxField } from '../../ui/CheckboxField';

interface AgreementData {
  file: File | null;
  isReferenceOnly: boolean;
  acceptInternational: boolean;
}

export const AgreementUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreements, setAgreements] = useState<AgreementData[]>([]);
  const [currentAgreement, setCurrentAgreement] = useState<AgreementData>({
    file: null,
    isReferenceOnly: false,
    acceptInternational: false,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCurrentAgreement((prev) => ({ ...prev, file }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setCurrentAgreement((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddAgreement = () => {
    setCurrentAgreement({
      file: null,
      isReferenceOnly: false,
      acceptInternational: false,
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentAgreement.file) {
      if (editingIndex !== null) {
        setAgreements((prev) =>
          prev.map((item, index) =>
            index === editingIndex ? currentAgreement : item
          )
        );
      } else {
        setAgreements((prev) => [...prev, currentAgreement]);
      }
      setIsModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setCurrentAgreement(agreements[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setAgreements((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <SectionHeader
        title="Agreement Upload"
        onAdd={handleAddAgreement}
        note="(Optional)"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Application Agreement (Optional)"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <DocumentUpload
            label="Upload agreement"
            name="agreementFile"
            note="(Ref only)"
            required
            onChange={handleFileChange}
          />

          <div className="space-y-2">
            <CheckboxField
              name="acceptInternational"
              label="Accept immigrant & international student applications"
              checked={currentAgreement.acceptInternational}
              onChange={(e) =>
                handleCheckboxChange('acceptInternational', e.target.checked)
              }
            />
          </div>
        </div>
      </Modal>

      <div className="space-y-3">
        {agreements.map((agreement, index) => (
          <DataCard
            key={index}
            content={`${agreement.file?.name || 'No file'}
            ${agreement.acceptInternational ? '| Accepts international' : ''}`}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
};
