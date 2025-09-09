"use client";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  name: string;
}

export default function ProfileModal({ isOpen, onClose, imageUrl, name }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-2xl max-h-full">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="bg-card border border-border rounded-lg p-6">
          <img
            src={imageUrl}
            alt={name}
            className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold">{name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}