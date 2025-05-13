
import { useState } from 'react';
import DrumPad from './DrumPad';
import { Slider } from "@/components/ui/slider";

// Import audio files
import kickSound from '../audio/kick.wav';
import snareSound from '../audio/snare.wav';
import hihatSound from '../audio/hihat.wav';

const DrumMachine = () => {
  const [beatCount, setBeatCount] = useState(0);
  const [volume, setVolume] = useState(75);

  const playSound = (sound: string) => {
    console.log(`Playing ${sound} sound`);
    setBeatCount(prev => prev + 1);
  };

  // Update global audio volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    // Set global volume for all audio elements
    document.querySelectorAll('audio').forEach((audio) => {
      audio.volume = newVolume / 100;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Apex Rhythm Lab
          </h1>
          <div className="text-gray-400 mt-2">Beat Count: {beatCount}</div>
        </div>
        
        {/* Volume control */}
        <div className="mb-10 px-4">
          <div className="text-gray-400 mb-2">Volume: {volume}%</div>
          <Slider 
            defaultValue={[volume]} 
            max={100} 
            step={1} 
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <DrumPad label="Kick" keyTrigger="q" onTrigger={() => playSound('kick')} soundSrc={kickSound} />
          <DrumPad label="Snare" keyTrigger="w" onTrigger={() => playSound('snare')} soundSrc={snareSound} />
          <DrumPad label="Hi-Hat" keyTrigger="e" onTrigger={() => playSound('hihat')} soundSrc={hihatSound} />
        </div>

        <div className="text-center mt-12 text-gray-400">
          Use Q, W, E keys or click/tap the pads
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
