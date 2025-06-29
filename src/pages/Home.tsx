import PropertyManagementForm from '../components/PropertyManagementForm/PropertyManagementForm';
import SelectionLists from '../components/SelectionlIst/SelectionLIst';
import useProperty from '../contexts/PropertyContext/useProperty';

const Home = () => {
  const { selectedRole, selectedProperty } = useProperty();

  const formActive = selectedRole !== null && selectedProperty !== null;
  return (
    <div className="">
      <SelectionLists />

      {/* form */}
      {formActive && <PropertyManagementForm />}
    </div>
  );
};

export default Home;
