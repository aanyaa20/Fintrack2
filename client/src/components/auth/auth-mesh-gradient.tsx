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
        Blob 1 - Dark blue with emerald hint - very subtle
      */}
      <div 
        className="absolute"
        style={{
          top: '-40%',
          left: '-30%',
          width: '110%',
          height: '110%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(6, 78, 59, 0.25) 0%, rgba(6, 95, 70, 0.15) 30%, transparent 60%)',
          filter: 'blur(90px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift1 7s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 2 - Pure black - deep darkness base
      */}
      <div 
        className="absolute"
        style={{
          top: '20%',
          right: '-35%',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.7) 0%, rgba(10, 15, 25, 0.5) 30%, transparent 60%)',
          filter: 'blur(90px)',
          mixBlendMode: 'multiply',
          animation: 'meshDrift2 9s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 3 - Dark cyan glow - subtle accent
      */}
      <div 
        className="absolute"
        style={{
          bottom: '-30%',
          left: '-35%',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.18) 0%, rgba(14, 165, 233, 0.12) 30%, transparent 60%)',
          filter: 'blur(90px)',
          mixBlendMode: 'screen',
          animation: 'meshPulse 6s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 4 - Dark blue-emerald blend
      */}
      <div 
        className="absolute"
        style={{
          top: '35%',
          right: '20%',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(13, 148, 136, 0.2) 0%, rgba(6, 78, 59, 0.12) 30%, transparent 60%)',
          filter: 'blur(90px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift3 8s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 5 - Dark teal accent - fast moving
      */}
      <div 
        className="absolute"
        style={{
          top: '-28%',
          left: '35%',
          width: '65%',
          height: '65%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.15) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 60%)',
          filter: 'blur(90px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift4 7s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* 
        Blob 6 - Deep blue accent
      */}
      <div 
        className="absolute"
        style={{
          bottom: '15%',
          right: '18%',
          width: '55%',
          height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.12) 0%, rgba(29, 78, 216, 0.08) 30%, transparent 60%)',
          filter: 'blur(90px)',
          mixBlendMode: 'screen',
          animation: 'meshDrift5 8s ease-in-out infinite',
          willChange: 'transform, opacity'
        }}
      />
    </div>
  );
};

export default AuthMeshGradient;
