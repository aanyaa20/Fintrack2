/**
 * AuthMeshGradient - Animated mesh/aurora gradient background effect
 * 
 * VERY DARK blackish base with subtle blue/emerald/cyan blend.
 * Fast-moving visible waves that continuously shift and blend.
 * Much darker and more subtle than before.
 */

const AuthMeshGradient = () => {
  return (
    <div 
      className="auth-mesh-gradient absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        background: 'linear-gradient(135deg, rgba(3, 7, 18, 0.98) 0%, rgba(7, 15, 28, 0.95) 50%, rgba(3, 7, 18, 0.98) 100%)'
      }}
    >
      {/* 
        Blob 1 - Vibrant emerald - highly visible
      */}
      <div 
        className="absolute"
        style={{
          top: '-40%',
          left: '-30%',
          width: '110%',
          height: '110%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.25) 30%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift1 4s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 2 - Deep blue - visible base
      */}
      <div 
        className="absolute"
        style={{
          top: '20%',
          right: '-35%',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.35) 0%, rgba(29, 78, 216, 0.2) 30%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift2 5s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 3 - Bright cyan glow - very visible
      */}
      <div 
        className="absolute"
        style={{
          bottom: '-30%',
          left: '-35%',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.45) 0%, rgba(14, 165, 233, 0.3) 30%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          animation: 'meshPulse 3s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 4 - Teal-emerald blend - vibrant
      */}
      <div 
        className="absolute"
        style={{
          top: '35%',
          right: '20%',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.4) 0%, rgba(13, 148, 136, 0.25) 30%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift3 4.5s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 5 - Bright teal - fast moving and visible
      */}
      <div 
        className="absolute"
        style={{
          top: '-28%',
          left: '35%',
          width: '65%',
          height: '65%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.4) 0%, rgba(6, 182, 212, 0.25) 30%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift4 3.5s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 6 - Sky blue accent - vibrant
      */}
      <div 
        className="absolute"
        style={{
          bottom: '15%',
          right: '18%',
          width: '55%',
          height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.35) 0%, rgba(37, 99, 235, 0.2) 30%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift5 4s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
    </div>
  );
};

export default AuthMeshGradient;
