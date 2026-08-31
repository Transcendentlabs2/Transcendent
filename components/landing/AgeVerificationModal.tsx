'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '@/app/assets/logo.webp';

const STORAGE_KEY = 'age_verified_transcendent';
const HIDDEN_ATTRIBUTE = 'data-age-gate-hidden';

export default function AgeVerificationModal() {
  // Render the gate in the initial HTML so first-time visitors do not wait for
  // hydration before the primary overlay can paint. A tiny inline guard below
  // hides it before paint for verified visitors and admin routes.
  const [showModal, setShowModal] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
    const isVerified = localStorage.getItem(STORAGE_KEY) === 'true';
    const shouldHide = isAdminRoute || isVerified;

    if (shouldHide) {
      document.documentElement.setAttribute(HIDDEN_ATTRIBUTE, 'true');
      setShowModal(false);
      return;
    }

    document.documentElement.removeAttribute(HIDDEN_ATTRIBUTE);
    setShowModal(true);
  }, [pathname]);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    document.documentElement.setAttribute(HIDDEN_ATTRIBUTE, 'true');
    setShowModal(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <>
      <style>{`
        html[${HIDDEN_ATTRIBUTE}="true"] [data-age-verification-modal] {
          display: none !important;
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              var path = window.location.pathname;
              var bypass = path.indexOf('/admin') === 0 || path.indexOf('/dashboard') === 0;
              var verified = window.localStorage.getItem('${STORAGE_KEY}') === 'true';
              if (bypass || verified) {
                document.documentElement.setAttribute('${HIDDEN_ATTRIBUTE}', 'true');
              }
            } catch (_) {}
          `,
        }}
      />

      {showModal && (
        <div
          data-age-verification-modal
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 touch-none"
        >
          <div className="relative bg-[var(--bg-page)] border border-[var(--glass-border)] p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,var(--text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-muted)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-[var(--color-brand-primary)]/20 blur-2xl rounded-full"></div>
                <Image
                  src={Logo}
                  alt="Transcendent Logo"
                  width={80}
                  height={80}
                  className="relative z-10 drop-shadow-2xl"
                />
              </div>

              <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tighter uppercase mb-4">
                Age Verification
              </h2>

              <p className="mb-10 text-[var(--text-muted)] text-sm leading-relaxed">
                The compounds in <span className="text-[var(--text-main)] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] uppercase">Transcendent Labs</span> are for research by adults only.
                <span className="block mt-3 font-medium text-[var(--text-main)]">
                  Confirm you are 18 or older to access.
                </span>
              </p>

              <div className="flex flex-col gap-4 w-full">
                <button
                  onClick={handleConfirm}
                  className="w-full py-4 bg-[var(--text-main)] text-[var(--bg-page)] font-bold rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(var(--color-brand-primary-rgb),0.3)] active:scale-95 uppercase tracking-widest"
                >
                  Enter Site
                </button>

                <button
                  onClick={handleReject}
                  className="w-full py-2 text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors uppercase tracking-[0.2em]"
                >
                  I am under 18 (Exit)
                </button>
              </div>

              <div className="mt-10 pt-6 border-t border-[var(--glass-border)] w-full">
                <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-[0.4em] opacity-50">
                  Bio-Active Engineering &copy; 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
