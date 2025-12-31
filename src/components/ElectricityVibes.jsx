export default function ElectricityVibes() {
  return (
    <>
      {/* Floating electricity decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top right lightning */}
        <div className="absolute top-20 right-10 text-8xl opacity-5 text-yellow-500 animate-pulse" style={{ animationDuration: '4s' }}>
          ⚡
        </div>
        
        {/* Bottom left lightning */}
        <div className="absolute bottom-32 left-5 text-9xl opacity-5 text-blue-500 rotate-12 animate-pulse" style={{ animationDuration: '5s' }}>
          ⚡
        </div>
        
        {/* Middle right small bolt */}
        <div className="absolute top-1/2 right-5 text-6xl opacity-5 text-purple-500 -rotate-45 animate-pulse" style={{ animationDuration: '3s' }}>
          ⚡
        </div>
        
        {/* Top left bulb */}
        <div className="absolute top-40 left-10 text-7xl opacity-5 text-amber-500 animate-pulse" style={{ animationDuration: '6s' }}>
          💡
        </div>
        
        {/* Bottom right plug */}
        <div className="absolute bottom-48 right-16 text-6xl opacity-5 text-green-500 rotate-6 animate-pulse" style={{ animationDuration: '5s' }}>
          🔌
        </div>

        {/* Subtle energy waves */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/5 to-purple-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/5 to-orange-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>
    </>
  );
}

