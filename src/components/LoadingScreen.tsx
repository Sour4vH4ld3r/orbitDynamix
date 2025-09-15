import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orbit-dark to-orbit-blue z-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orbit-purple/10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-orbit-cyan/5 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative">
        <img src="/logo.svg" alt="OrbitDynamix Logo" className="w-40 h-40 animate-float" />
        <div className="animate-orbit absolute -top-4 -right-4 w-6 h-6 rounded-full bg-orbit-cyan opacity-70"></div>
        <div className="animate-orbit absolute -bottom-4 -left-4 w-4 h-4 rounded-full bg-orbit-purple opacity-70" style={{ animationDelay: '0.5s', animationDuration: '15s' }}></div>
      </div>
      
      <h1 className="mt-6 text-3xl font-bold gradient-text">OrbitDynamix</h1>
      <p className="text-gray-300 mt-2 mb-4">Launching your digital experience</p>
      <div className="w-64 h-2 mt-4 bg-orbit-slate-light rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orbit-cyan to-orbit-purple transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-orbit-cyan font-bold">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;
