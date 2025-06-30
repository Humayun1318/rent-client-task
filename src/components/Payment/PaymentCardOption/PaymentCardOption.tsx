import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import { SectionHeader } from '../../Condominiums/SectionHeader/SectionHeader';
import { DataCard } from '../../Condominiums/DataCard/DataCard';

interface CreditCardData {
  name: string;
  number: string;
  expireDate: string;
  cvc: string;
}

export const PaymentCardOption = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const [cards, setCards] = useState<CreditCardData[]>([
    {
      name: 'Alex Jones',
      number: '1234 3434 4342 3422',
      expireDate: '08/26',
      cvc: '123',
    },
    {
      name: 'Alex Jones',
      number: '1234 3434 4342 1297',
      expireDate: '08/29',
      cvc: '123',
    },
    {
      name: 'Alex Jones',
      number: '1234 3434 4342 3443',
      expireDate: '08/35',
      cvc: '123',
    },
  ]);
  const [currentCard, setCurrentCard] = useState<CreditCardData>({
    name: '',
    number: '',
    expireDate: '',
    cvc: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCard = () => {
    setCurrentCard({
      name: '',
      number: '',
      expireDate: '',
      cvc: '',
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (
      currentCard.name &&
      currentCard.number &&
      currentCard.expireDate &&
      currentCard.cvc
    ) {
      if (editingIndex !== null) {
        setCards((prev) =>
          prev.map((item, index) =>
            index === editingIndex ? currentCard : item
          )
        );
      } else {
        setCards((prev) => [...prev, currentCard]);
      }
      setIsModalOpen(false);
    }
  };

  const handleEdit = (index: number) => {
    setCurrentCard(cards[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (cards.length > 0) {
      setActiveCardIndex(1);
    }
  }, [cards]);

  return (
    <div className="space-y-4 shadow rounded-xl mt-12">
      <div className="px-3">
        <SectionHeader
          title="Payment Information"
          onAdd={handleAddCard}
          card="card"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add new card`}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          {/* Name on Card */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on card
            </label>
            <input
              type="text"
              name="name"
              value={currentCard.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Alex Jones"
              required
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card number
            </label>
            <input
              type="text"
              name="number"
              value={currentCard.number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0000 0000 0000 0000"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expire Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expire date
              </label>
              <input
                type="text"
                name="expireDate"
                value={currentCard.expireDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="MM/YY"
                required
              />
            </div>

            {/* CVC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                value={currentCard.cvc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
      </Modal>

      <div className="space-y-3">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => setActiveCardIndex(index)}
            className={`rounded-lg transition border cursor-pointer
        ${activeCardIndex === index ? 'border-blue-500 shadow-2xl shadow-indigo-200' : 'border-gray-200'}`}
          >
            <DataCard
              key={index}
              content={`${card.name}(Amex card) •••• ${card.number.slice(-4)}`}
              note={`Expires in ${card.expireDate}`}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
              cardIcon={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
