
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DrumPadProps {
  label: string;
  keyTrigger: string;
  onTrigger: () => void;
  soundSrc: string;
}

const DrumPad = ({ label, keyTrigger, onTrigger, soundSrc }: DrumPadProps) => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(soundSrc);
  }, [soundSrc]);

  const playSound = () => {
    if (audioRef.current) {
      // Reset audio to beginning if it's already playing
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsActive(true);
    onTrigger();
    setTimeout(() => setIsActive(false), 100);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === keyTrigger.toLowerCase()) {
        playSound();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keyTrigger]);

  return (
    <button
      onClick={playSound}
      className={cn(
        "w-32 h-32 rounded-full transition-all duration-200 flex items-center justify-center",
        "bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
        "text-white font-bold text-lg shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50",
        isActive && "scale-95 opacity-80"
      )}
    >
      <div className="text-center">
        <div>{label}</div>
        <div className="text-sm opacity-70">({keyTrigger})</div>
      </div>
    </button>
  );
};

export default DrumPad;
