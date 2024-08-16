import React, { useState, useEffect } from 'react';

const TypingCodeAnimation = ({ 
  code = "df.read_csv('Dear Stan')", 
  typingSpeed = 100, 
  pauseDuration = 5000,
  videoSrc = "/test.mp4" // Placeholder for vertical video
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    let isPaused = false;

    const typeCharacter = () => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeCharacter, typingSpeed);
      } else {
        isPaused = true;
        timeoutId = setTimeout(resetAnimation, pauseDuration);
      }
    };

    const resetAnimation = () => {
      setDisplayedCode('');
      currentIndex = 0;
      isPaused = false;
      timeoutId = setTimeout(typeCharacter, typingSpeed);
    };

    timeoutId = setTimeout(typeCharacter, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [code, typingSpeed, pauseDuration]);

  useEffect(() => {
    const cursorIntervalId = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorIntervalId);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <pre className="relative z-10 font-mono text-white text-4xl bg-black bg-opacity-30 p-6 rounded max-w-[80%] text-center">
        <code>{displayedCode}</code>
        <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
      </pre>
    </div>
  );
};

const FullscreenDemo = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <TypingCodeAnimation />
    </div>
  );
};

export default FullscreenDemo;