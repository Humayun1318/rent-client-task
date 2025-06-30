import { useEffect, useState } from 'react';
import useProperty from '../../../contexts/PropertyContext/useProperty';
import { PaymentCardOption } from '../PaymentCardOption/PaymentCardOption';

const plans = [
  {
    name: 'Regular',
    monthly: 99.99,
    annually: 99.99 * 12 * 0.43, // Save 57%
  },
  {
    name: 'Platinum',
    monthly: 129.99,
    annually: 129.99 * 12 * 0.43,
  },
  {
    name: 'Enterprize',
    monthly: 199.99,
    annually: 199.99 * 12 * 0.43,
  },
];

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'monthly'
  );
  const [selectedPlan, setSelectedPlan] = useState('Regular');
  const [autoPay, setAutoPay] = useState(true);
  const { setPricing } = useProperty();

  const handlePrice = (price: number, plan: string) => {
    setPricing(price);
    setSelectedPlan(plan);
  };
  const toggleBilling = (cycle: 'monthly' | 'annually') =>
    setBillingCycle(cycle);

  useEffect(() => {
    const defaultPlan = plans.find((plan) => plan.name === selectedPlan);
    if (defaultPlan) {
      const price =
        billingCycle === 'monthly' ? defaultPlan.monthly : defaultPlan.annually;
      setPricing(price);
    }
  }, [selectedPlan, billingCycle, setPricing]);

  return (
    <div className=" p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Chose a plan for after 30-days free trial
      </h2>

      {/* Toggle */}
      <div className="inline-flex border border-gray-200 p-2  shadow rounded-lg  mb-6">
        <button
          onClick={() => toggleBilling('monthly')}
          className={`mr-4 p-4 rounded-md text-sm font-medium
            ${
              billingCycle === 'monthly'
                ? 'bg-blue-100 shadow text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Monthly
        </button>
        <button
          onClick={() => toggleBilling('annually')}
          className={`
            px-4 rounded-md text-sm font-medium
            ${
              billingCycle === 'annually'
                ? 'bg-blue-100 shadow text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Annually (save 57%)
        </button>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        {plans.map((plan) => {
          const price =
            billingCycle === 'monthly' ? plan.monthly : plan.annually;
          const isSelected = selectedPlan === plan.name;

          return (
            <div
              key={plan.name}
              onClick={() => handlePrice(price, plan.name)}
              className={` border 
                 rounded-xl p-4 cursor-pointer transition
                ${isSelected ? 'border-blue-500 bg-indigo-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-800 p-4 border border-gray-400 rounded-xl">
                  {plan.name}
                </span>
                {isSelected && (
                  <label
                    className="flex items-center space-x-1 text-xs font-medium text-blue-600 py-4 px-3
                    border border-gray-400 rounded-xl"
                  >
                    <input
                      type="checkbox"
                      checked={autoPay}
                      onChange={(e) => setAutoPay(e.target.checked)}
                      className="accent-blue-600 rounded-sm"
                    />
                    <span>Auto Pay</span>
                  </label>
                )}
              </div>
              <p className="text-2xl font-semibold text-gray-900 mb-4">
                ${price.toFixed(2)}
                <span className="text-sm font-normal text-gray-500">{`${billingCycle === 'monthly' ? '/mo' : '/yr'}`}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Price for 1–50 unit</p>
            </div>
          );
        })}
      </div>

      {/* card option */}
      <PaymentCardOption />
    </div>
  );
};

export default PricingPlans;
