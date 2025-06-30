import { AboutPropertyMessage } from '../components/Condominiums/AboutPropertyMessage/AboutPropertyMessage';
import { AgreementUpload } from '../components/Condominiums/AgreementUpload/AgreementUpload';
import { AmenitiesManager } from '../components/Condominiums/AmenitiesManager/AmenitiesManager';
import { FeeInformation } from '../components/Condominiums/FeeInFormation/FeeInFormation';
import { LandMark } from '../components/Condominiums/LandMark/LandMark';
import { LeasingInfo } from '../components/Condominiums/LeasingInfo/LeasingInfo';
import { NearestEducation } from '../components/Condominiums/NearestEducation/NearestEducation';
import { NearestStation } from '../components/Condominiums/NearestStation/NearestStation';
import { Parking } from '../components/Condominiums/Parking/Parking';
import { PropertyAdress } from '../components/Condominiums/PropertyAdress/CondominiumsSectionCard';
import PropertyGalleryForm from '../components/Condominiums/PropertyGalleryForm/PropertyGalleryForm';
import { RentSchedule } from '../components/Condominiums/RentSchedule/RentSchedule';
import { PetFees } from '../components/Condominiums/SectionHeader/PetFees/PetFees';
import { UtilityProvider } from '../components/Condominiums/UtilityProvider/UtilityProvider';
import VideoUploadForm from '../components/Condominiums/VideoUploadForm/VideoUploadForm';

const CondominiumsInfo = () => {
  return (
    <div className="relative">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        Condominiums Information
      </h1>
      <div className="flex flex-col sm:flex-row w-full gap-4">
        {/* {condominiumSections.map((section) => (
          <CondominiumsSectionCard
            key={section.id}
            title={section.title}
            status={section.status}
            onAdd={() => handleAddSection(section.title)}
          />
        ))} */}
        {/* left side */}
        <section className="flex-1 space-y-3">
          <div className="p-3 border border-gray-200 rounded-lg">
            <PropertyAdress />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <LeasingInfo />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <FeeInformation />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <RentSchedule />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <AgreementUpload />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <AboutPropertyMessage />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <AmenitiesManager />
          </div>
        </section>

        {/* right side */}
        <section className="flex-1">
          <div className="p-3 border border-gray-200 rounded-lg">
            <PetFees />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <Parking />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <NearestEducation />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <NearestStation />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <LandMark />
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <UtilityProvider />
          </div>
        </section>
      </div>
      {/* for iamge */}
      <section className="mt-16 rounded-xl border border-gray-300">
        <h4 className="border-b border-gray-300 py-4 px-4">
          Property gallery{' '}
          <span className="text-gray-500 text-sm">
            {`(its not unit photo)`}*
          </span>
        </h4>

        <div className="p-4">
          <PropertyGalleryForm />
        </div>
      </section>
      {/* for video */}
      <section className='mt-12'>
        <VideoUploadForm />
      </section>
    </div>
  );
};

export default CondominiumsInfo;
