import { useState } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import Modal from '../../ui/Modal';
import { DataCard } from '../DataCard/DataCard';

interface RentScheduleData {
  paymentFrequency: string;
  reminderDate: string;
  dueDate: string;
}

export const RentSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<RentScheduleData[]>([]);
  const [currentSchedule, setCurrentSchedule] = useState<RentScheduleData>({
    paymentFrequency: 'Monthly',
    reminderDate: '28th',
    dueDate: '5th',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSchedule = () => {
    setCurrentSchedule({
      paymentFrequency: 'Monthly',
      reminderDate: '28th',
      dueDate: '5th',
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      setSchedules((prev) =>
        prev.map((item, index) =>
          index === editingIndex ? currentSchedule : item
        )
      );
    } else {
      setSchedules((prev) => [...prev, currentSchedule]);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setCurrentSchedule(schedules[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  // Generate day options (1st-31st)
  const dayOptions = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
    return `${day}${suffix}`;
  });
  

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Rent Payment Schedule"
        onAdd={handleAddSchedule}
        required
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Rent Payment Schedule"
        onSubmit={handleSubmit}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent payment frequency
              </label>
              <select
                name="paymentFrequency"
                value={currentSchedule.paymentFrequency}
                onChange={handleInputChange}
                className="block w-full py-2 border border-gray-300 rounded-md 
                shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Quarterly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent Reminder/Statement date
              </label>
              <select
                name="reminderDate"
                value={currentSchedule.reminderDate}
                onChange={handleInputChange}
                className="block w-full py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {dayOptions.map((day) => (
                  <option key={day} value={day}>
                    {day} every month
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent due date
              </label>
              <select
                name="dueDate"
                value={currentSchedule.dueDate}
                onChange={handleInputChange}
                className="block w-full py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {dayOptions.map((day) => (
                  <option key={day} value={day}>
                    {day} every month
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal>

      <div className="space-y-3">
        {schedules.map((schedule, index) => (
          <DataCard
            key={index}
            content={`Rent payment frequency:${schedule.paymentFrequency}, 
            Rent reminder date: ${schedule.reminderDate} every month,
             Rent due date: ${schedule.dueDate} every month`}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};
