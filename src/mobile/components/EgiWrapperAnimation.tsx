const BADGE_W = 92; // px — larghezza fissa per tutti i badge

const BADGES = [
    { label: '4.5% Royalties', color: '#10b981', delay: '1.0s',
      style: { top: 8, left: `calc(50% - ${BADGE_W / 2}px)` } },
    { label: 'Blockchain',     color: '#00b4d8', delay: '1.5s',
      style: { right: 4, top: 'calc(50% - 13px)' } },
    { label: '0€ Upfront',    color: '#fbbf24', delay: '2.0s',
      style: { bottom: 8, left: `calc(50% - ${BADGE_W / 2}px)` } },
    { label: 'IP Tutelato',   color: '#a855f7', delay: '2.5s',
      style: { left: 4, top: 'calc(50% - 13px)' } },
];

export const EgiWrapperAnimation = () => (
    <>
        <style>{`
            @keyframes egi-spin {
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
            @keyframes egi-ring-pulse {
                0%,100% { opacity: 0.5; }
                50%     { opacity: 1; }
            }
            @keyframes egi-img1 {
                0%,40%,96%,100% { opacity: 1; }
                46%,90%         { opacity: 0; }
            }
            @keyframes egi-img2 {
                0%,40%,96%,100% { opacity: 0; }
                46%,90%         { opacity: 1; }
            }
            @keyframes egi-float {
                0%,100% { transform: translate(-50%,-50%) translateY(0px);   }
                50%     { transform: translate(-50%,-50%) translateY(-6px); }
            }
            @keyframes egi-badge-in {
                from { opacity: 0; transform: scale(0.4); }
                to   { opacity: 1; transform: scale(1); }
            }
            @keyframes egi-badge-pulse {
                0%,100% { box-shadow: none; }
                50%     { box-shadow: 0 0 8px var(--egi-badge-color); }
            }
        `}</style>

        <div className="relative w-full flex items-center justify-center" style={{ height: 300 }}>
            <div className="relative" style={{ width: 270, height: 270 }}>

                {/* ── Outer spinning conic ring (EGI wrapper visual) ── */}
                <div style={{
                    position: 'absolute', width: 206, height: 206,
                    top: '50%', left: '50%',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, transparent 0deg, #10b981 50deg, #fbbf24 80deg, transparent 140deg, transparent 360deg)',
                    animation: 'egi-spin 5s linear infinite',
                    opacity: 0.85,
                }} />

                {/* ── Static base ring ── */}
                <div style={{
                    position: 'absolute', width: 198, height: 198,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(16,185,129,0.25)',
                    animation: 'egi-ring-pulse 3s ease-in-out infinite',
                }} />

                {/* ── EGI tag on ring ── */}
                <div style={{
                    position: 'absolute',
                    top: 'calc(50% - 103px)',
                    left: 'calc(50% - 18px)',
                    background: '#10b981',
                    color: '#000',
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    padding: '2px 7px',
                    borderRadius: 4,
                    zIndex: 20,
                }}>
                    EGI
                </div>

                {/* ── Center product circle ── */}
                <div style={{
                    position: 'absolute',
                    width: 130, height: 130,
                    top: '50%', left: '50%',
                    borderRadius: '50%',
                    background: 'rgba(5,8,18,0.95)',
                    border: '1px solid rgba(16,185,129,0.5)',
                    overflow: 'hidden',
                    zIndex: 10,
                    animation: 'egi-float 5s ease-in-out infinite',
                    boxShadow: '0 0 30px rgba(16,185,129,0.25)',
                }}>
                    <img
                        src="/images/statue_source.png"
                        alt="Prodotto"
                        style={{
                            position: 'absolute', inset: 10,
                            width: 'calc(100% - 20px)', height: 'calc(100% - 20px)',
                            objectFit: 'contain',
                            animation: 'egi-img1 8s ease-in-out infinite',
                        }}
                    />
                    <img
                        src="/images/collectible_source.png"
                        alt="Prodotto"
                        style={{
                            position: 'absolute', inset: 10,
                            width: 'calc(100% - 20px)', height: 'calc(100% - 20px)',
                            objectFit: 'contain',
                            animation: 'egi-img2 8s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* ── Benefit badges ── */}
                {BADGES.map(({ label, color, delay, style }) => (
                    <div
                        key={label}
                        style={{
                            position: 'absolute',
                            width: BADGE_W,
                            zIndex: 15,
                            animation: `egi-badge-in 0.4s ease-out ${delay} both`,
                            ['--egi-badge-color' as string]: color,
                            ...style,
                        }}
                    >
                        <div style={{
                            background: `${color}18`,
                            border: `1px solid ${color}70`,
                            borderRadius: 20,
                            padding: '4px 0',
                            fontSize: 10,
                            fontWeight: 700,
                            color,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.03em',
                        }}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
);
