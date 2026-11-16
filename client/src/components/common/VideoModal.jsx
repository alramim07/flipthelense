import React from 'react';

export default function VideoModal({ isOpen, title, url, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-neutral-900 rounded-lg border border-neutral-700 overflow-hidden shadow-2xl">
        <div className="p-3 bg-neutral-950 flex justify-between items-center border-b border-neutral-800">
          <h3 className="text-xs font-bold text-white">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-white p-1 cursor-pointer transition"
          >
            ✕
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe 
            className="w-full h-full" 
            src={url} 
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </div>
      </div>
    </div>
  );
}
