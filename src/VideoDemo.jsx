import React, { useEffect, useRef } from 'react';
import './VideoSection.css';
import videomy from './assets/thevideo.mp4';
const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="video-section" id="video-section">
      <h2 className="video-title">Watch How It Works</h2>
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={videomy}
          muted
          loop
          playsInline
          className="video-player"
        ></video>
      </div>
    </section>
  );
};

export default VideoSection;
