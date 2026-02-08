"use client";
import { Lock, Shield } from "lucide-react";

export default function SecureBadges() {
  return (
    <div className="mt-6 pt-4 border-t border-[var(--glass-border)] opacity-70 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center gap-4 mb-3 grayscale">
            {/* Simulación de Logos de Tarjetas (SVG inline para no cargar imágenes externas) */}
            <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.00001C0 0.89544 0.895431 0 2 0H36C37.1046 0 38 0.89543 38 2V22C38 23.1046 37.1046 24 36 24H2C0.895431 24 0 23.1046 0 22V2.00001Z" fill="#1434CB"/><path d="M12.1611 14.3942C12.1611 14.3942 15.6558 12.352 16.7126 10.9995C17.027 12.636 17.653 14.8697 17.653 14.8697H19.9577C19.9577 14.8697 18.0069 9.87327 17.7656 8.87891H15.6963C15.3526 8.87891 15.2215 9.07185 15.1154 9.42907C15.1585 9.38202 16.1264 12.2152 16.1264 12.2152C16.1264 12.2152 12.6022 13.9213 11.2338 14.3942H12.1611ZM26.072 14.8697H27.9705L29.1362 8.87891H27.2377L26.072 14.8697ZM29.626 14.8697H31.5245L32.6902 8.87891H30.7917L29.626 14.8697ZM24.4716 8.87891L23.4907 13.4795L22.4287 9.17282C22.3484 8.93291 22.062 8.87891 21.9084 8.87891H19.9507L22.6186 14.8697H24.7825L26.9602 8.87891H24.4716Z" fill="white"/></svg>
            <span className="font-mono text-[10px] font-bold tracking-widest">VISA / MC / CRYPTO</span>
        </div>
        
        <div className="flex justify-between items-center text-[9px] text-[var(--text-muted)] uppercase tracking-widest">
            <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>256-Bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Fraud Protection</span>
            </div>
        </div>
    </div>
  );
}