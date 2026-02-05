'use client';

export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-brand-dark">
      {/* Gradiente Mesh Animado - CSS Puro para rendimiento */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, rgba(76, 29, 149, 0.15), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.15), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1), transparent 50%)
          `,
          filter: 'blur(60px)',
        }}
      />
      
      {/* Malla de ruido para textura (evita banding) */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
      />
    </div>
  );
}