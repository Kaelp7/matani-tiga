import { useState, useRef, useEffect } from 'react';
import { X, Download } from 'lucide-react';

export default function ImageModal({ src, alt, onClose }) {
  const [zoom, setZoom] = useState(0.5); // Set initial zoom to 0.5
  const imgRef = useRef(null);

  // Zoom with scroll
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  // Attach wheel event
  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      img.addEventListener('wheel', handleWheel);
      return () => {
        img.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  // Handle keydown event for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="relative" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-center h-screen">
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="transition-transform duration-200 ease-in-out select-none"
            style={{
              transform: `scale(${zoom})`,
              maxWidth: 'none',
              maxHeight: 'none',
              objectFit: 'contain',
              userSelect: 'none',
            }}
          />
        </div>
      </div>
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <a href={src} download className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Download className="w-6 h-6" />
        </a>
        <button onClick={onClose} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}