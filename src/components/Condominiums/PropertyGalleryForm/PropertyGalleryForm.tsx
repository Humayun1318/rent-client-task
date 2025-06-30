import { useState, useRef, type ChangeEvent } from 'react';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PhotoIcon } from '@heroicons/react/24/solid';

interface GalleryPhoto {
  id: string;
  url: string;
  isFeatured: boolean;
  file: File;
}

const PropertyGalleryForm = () => {
  const [featuredPhotos, setFeaturedPhotos] = useState<GalleryPhoto[]>([]);
  const [morePhotos, setMorePhotos] = useState<GalleryPhoto[]>([]);
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const morePhotosInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    target: 'featured' | 'more'
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const newPhotos = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      url: URL.createObjectURL(file),
      isFeatured: target === 'featured' && featuredPhotos.length === 0,
      file,
    }));

    if (target === 'featured') {
      setFeaturedPhotos((prev) => [...prev, ...newPhotos]);
    } else {
      setMorePhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (id: string, target: 'featured' | 'more') => {
    if (target === 'featured') {
      setFeaturedPhotos((prev) => prev.filter((photo) => photo.id !== id));
    } else {
      setMorePhotos((prev) => prev.filter((photo) => photo.id !== id));
    }
  };

  const setFeatured = (id: string) => {
    setFeaturedPhotos((prev) =>
      prev.map((photo) => ({
        ...photo,
        isFeatured: photo.id === id,
      }))
    );
  };

  const triggerFileInput = (target: 'featured' | 'more') => {
    if (target === 'featured') {
      featuredInputRef.current?.click();
    } else {
      morePhotosInputRef.current?.click();
    }
  };

  return (
    <div className=" flex flex-col sm:flex-row gap-4">
      {/* Featured Photos Section */}
      <section className="md:w-1/2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Featured photos <span className="text-red-500">*</span>
        </h3>

        <div className="flex flex-col md:flex-row gap-4 md:h-[90%]">
          {/* Cover Photo Upload */}
          <div className="w-full md:w-1/2">
            <div
              onClick={() => triggerFileInput('featured')}
              className="w-full h-full rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
            >
              {featuredPhotos.length > 0 && featuredPhotos[0].isFeatured ? (
                <div className="relative w-full h-full">
                  <img
                    src={featuredPhotos[0].url}
                    alt="Cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(featuredPhotos[0].id, 'featured');
                    }}
                    className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              ) : (
                <>
                  <ArrowUpTrayIcon className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Upload cover photo
                  </p>
                  <p className="text-xs text-gray-500 mt-1">(URL prep only)</p>
                </>
              )}
            </div>
          </div>

          {/* Additional Featured Photos */}
          <div className="grid sm:grid-cols-2 gap-3 md:w-[90%] ">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="">
                {featuredPhotos[index + 1] ? (
                  <div className="relative h-full w-full rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={featuredPhotos[index + 1].url}
                      alt={`Featured ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFeatured(featuredPhotos[index + 1].id);
                        }}
                        className="bg-white/80 p-1 rounded-full hover:bg-white"
                      >
                        <PhotoIcon className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(featuredPhotos[index + 1].id, 'featured');
                        }}
                        className="bg-white/80 p-1 rounded-full hover:bg-white"
                      >
                        <XMarkIcon className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => triggerFileInput('featured')}
                    className="h-full w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <ArrowUpTrayIcon className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          ref={featuredInputRef}
          onChange={(e) => handleFileUpload(e, 'featured')}
          multiple
          accept="image/jpeg,image/png"
          className="hidden"
        />
      </section>

      {/* More Photos Section */}
      <section className="md:w-1/2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          More photos <span className="text-gray-500">(optional)</span>
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-square">
              {morePhotos[index] ? (
                <div className="relative h-full w-full rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={morePhotos[index].url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(morePhotos[index].id, 'more')}
                    className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => triggerFileInput('more')}
                  className="h-full w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <ArrowUpTrayIcon className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <input
          type="file"
          ref={morePhotosInputRef}
          onChange={(e) => handleFileUpload(e, 'more')}
          multiple
          accept="image/jpeg,image/png"
          className="hidden"
        />
      </section>
    </div>
  );
};

export default PropertyGalleryForm;
