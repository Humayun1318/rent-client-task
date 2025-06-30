import { useState, useRef, type ChangeEvent } from 'react';
import {
  ArrowUpTrayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const VideoUploadForm = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [videos, setVideos] = useState<{
    propertyVideo: File | null;
    virtualTour: File | null;
    aerialVideo: File | null;
  }>({
    propertyVideo: null,
    virtualTour: null,
    aerialVideo: null,
  });

  const inputRefs = {
    propertyVideo: useRef<HTMLInputElement>(null),
    virtualTour: useRef<HTMLInputElement>(null),
    aerialVideo: useRef<HTMLInputElement>(null),
  };

  const handleVideoUpload = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof typeof videos
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideos((prev) => ({ ...prev, [type]: file }));
    }
  };

  const removeVideo = (type: keyof typeof videos) => {
    setVideos((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      {/* Accordion Header */}
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-sm font-medium text-gray-700">
          Videos <span className="text-gray-500">(optional)</span>
        </h3>
        {isAccordionOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Accordion Content */}
      {isAccordionOpen && (
        <div className="mt-4 space-y-6 border-t border-gray-200 py-4 grid md:grid-cols-3 gap-4">
          {/* Property Video */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Property Video <span className="text-gray-500">(optional)</span>
            </h4>
            <div
              onClick={() => inputRefs.propertyVideo.current?.click()}
              className="w-full h-28 border-2 border-dashed border-gray-300 
              rounded-lg bg-gray-50 flex flex-col items-center justify-center 
              cursor-pointer hover:bg-gray-100"
            >
              {videos.propertyVideo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video className="max-h-full max-w-full">
                    <source
                      src={URL.createObjectURL(videos.propertyVideo)}
                      type={videos.propertyVideo.type}
                    />
                  </video>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo('propertyVideo');
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <ArrowUpTrayIcon className="w-5 h-5 text-gray-400 mb-1" />
                  <p className="text-sm text-gray-700">Upload video</p>
                  <p className="text-xs text-gray-500">(MP4, MOV only)</p>
                  <input
                    type="file"
                    ref={inputRefs.propertyVideo}
                    onChange={(e) => handleVideoUpload(e, 'propertyVideo')}
                    accept="video/mp4,video/quicktime"
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>

          {/* Virtual Tour */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Property virtual tour{' '}
              <span className="text-gray-500">(optional)</span>
            </h4>
            <div
              onClick={() => inputRefs.virtualTour.current?.click()}
              className="w-full h-28 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
            >
              {videos.virtualTour ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video className="max-h-full max-w-full">
                    <source
                      src={URL.createObjectURL(videos.virtualTour)}
                      type={videos.virtualTour.type}
                    />
                  </video>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo('virtualTour');
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <ArrowUpTrayIcon className="w-5 h-5 text-gray-400 mb-1" />
                  <p className="text-sm text-gray-700">Upload video</p>
                  <p className="text-xs text-gray-500">(MP4, MOV only)</p>
                  <input
                    type="file"
                    ref={inputRefs.virtualTour}
                    onChange={(e) => handleVideoUpload(e, 'virtualTour')}
                    accept="video/mp4,video/quicktime"
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>

          {/* Aerial Video */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Property aerial video{' '}
              <span className="text-gray-500">(optional)</span>
            </h4>
            <div
              onClick={() => inputRefs.aerialVideo.current?.click()}
              className="w-full h-28 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
            >
              {videos.aerialVideo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video className="max-h-full max-w-full">
                    <source
                      src={URL.createObjectURL(videos.aerialVideo)}
                      type={videos.aerialVideo.type}
                    />
                  </video>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo('aerialVideo');
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <ArrowUpTrayIcon className="w-5 h-5 text-gray-400 mb-1" />
                  <p className="text-sm text-gray-700">Upload video</p>
                  <p className="text-xs text-gray-500">(MP4, MOV only)</p>
                  <input
                    type="file"
                    ref={inputRefs.aerialVideo}
                    onChange={(e) => handleVideoUpload(e, 'aerialVideo')}
                    accept="video/mp4,video/quicktime"
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
