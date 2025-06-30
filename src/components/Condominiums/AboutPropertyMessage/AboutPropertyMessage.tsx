import { useState } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import Modal from '../../ui/Modal';
import { DataCard } from '../DataCard/DataCard';

interface MessageData {
  content: string;
}

export const AboutPropertyMessage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [currentMessage, setCurrentMessage] = useState<MessageData>({
    content: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage({ content: e.target.value });
  };

  const handleAddMessage = () => {
    setCurrentMessage({ content: '' });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentMessage.content.trim()) {
      if (editingIndex !== null) {
        setMessages((prev) =>
          prev.map((item, index) =>
            index === editingIndex ? currentMessage : item
          )
        );
      } else {
        setMessages((prev) => [...prev, currentMessage]);
      }
      setIsModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setCurrentMessage(messages[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <SectionHeader
        title="About the property"
        onAdd={handleAddMessage}
        note="(Optonal)"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Type message here"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <textarea
            value={currentMessage.content}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border border-gray-300 
            rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          />
        </div>
      </Modal>

      <div className="space-y-3">
        {messages.map((message, index) => (
          <DataCard
            key={index}
            content={message.content}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
};
