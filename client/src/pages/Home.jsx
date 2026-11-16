import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import ReelsSection from '../components/home/ReelsSection';
import AboutSection from '../components/home/AboutSection';
import EditingProcessSection from '../components/home/EditingProcessSection';
import ClientReviewSection from '../components/home/ClientReviewSection';
import CtaSection from '../components/home/CtaSection';
import VideoModal from '../components/common/VideoModal';

export default function Home() {
  const [modalVideo, setModalVideo] = useState({ isOpen: false, title: '', url: '' });

  const handleOpenVideo = (title, url) => {
    setModalVideo({ isOpen: true, title, url });
  };

  const handleCloseVideo = () => {
    setModalVideo({ isOpen: false, title: '', url: '' });
  };

  return (
    <div className="max-w-[1080px] mx-auto px-4 sm:px-6 pt-10">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Reels & Shorts Gallery */}
      <ReelsSection onOpenVideo={handleOpenVideo} />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Editing Process */}
      <EditingProcessSection />

      {/* 5. Client Review Testimonials */}
      <ClientReviewSection />

      {/* 6. Call To Action Banner */}
      <CtaSection />

      {/* Global Video Modal */}
      <VideoModal
        isOpen={modalVideo.isOpen}
        title={modalVideo.title}
        url={modalVideo.url}
        onClose={handleCloseVideo}
      />
    </div>
  );
}
