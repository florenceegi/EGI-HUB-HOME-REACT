/**
 * SigilloLegalValuePage — Il valore legale reale di Sigillo, spiegato onestamente.
 * Niente promesse esagerate. Niente minimizzazioni. Quello che è, quello che non è.
 * Route: /sigillo/valore-legale
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-26
 * @purpose Pagina pubblica informativa sul valore legale di Sigillo (eIDAS, IP, diritto d'autore)
 */
import { motion } from 'framer-motion';
import { useUIStore } from '@/stores/useUIStore';

export function SigilloLegalValuePage() {
    const navigate = useUIStore((s) => s.navigate);

    return (
        <div className="min-h-screen text-white" style={{ background: '#0A1222' }}>

            {/* Header */}
            <div className="px-6 pt-12 pb-8 max-w-3xl mx-auto">
                <button
                    type="button"
                    onClick={() => navigate('/sigillo')}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors mb-6 focus:outline-none block"
                    aria-label="Torna a Sigillo"
                >
                    ← Sigillo
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <p className="text-[10px] uppercase tracking-widest text-[var(--accent)]/70">
                        Trasparenza
                    </p>
                    <h1
                        className="text-3xl md:text-4xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Il valore legale di Sigillo
                    </h1>
                    <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                        Quello che Sigillo garantisce davvero. Senza promesse esagerate, senza minimizzazioni.
                    </p>
                </motion.div>
            </div>

            <div className="px-6 pb-20 max-w-3xl mx-auto space-y-8">

                {/* Cosa dimostra */}
                <Section
                    index={0}
                    icon="✅"
                    title="Cosa dimostra Sigillo"
                    accent="emerald"
                >
                    <p className="text-sm text-white/65 leading-relaxed mb-4">
                        Sigillo fornisce una <strong className="text-white/85">prova crittografica di anteriorità temporale</strong>:
                        dimostra che un file con un determinato contenuto esatto esisteva prima della data riportata nel certificato.
                    </p>
                    <ul className="space-y-3">
                        <LegalPoint icon="🔒">
                            <strong>Immodificabilità dell'evidenza</strong> — L'impronta SHA-256 è univoca.
                            Qualsiasi modifica al file, anche di un singolo bit, produce un hash completamente diverso.
                            Non è possibile alterare il documento mantenendo lo stesso hash.
                        </LegalPoint>
                        <LegalPoint icon="⏱️">
                            <strong>Timestamp indipendente (RFC 3161)</strong> — Il momento della certificazione è attestato
                            da un'autorità di timestamp (TSA) terza rispetto a FlorenceEGI, secondo lo standard RFC 3161.
                            Questo timestamp è verificabile offline e indipendente dalla blockchain.
                        </LegalPoint>
                        <LegalPoint icon="⛓️">
                            <strong>Ancoraggio su blockchain pubblica Algorand</strong> — L'hash viene incluso in un
                            Merkle tree e ancorato permanentemente sulla blockchain pubblica Algorand.
                            La registrazione è immutabile e verificabile da chiunque su allo.info,
                            senza dipendere da FlorenceEGI.
                        </LegalPoint>
                        <LegalPoint icon="⚖️">
                            <strong>Prova di anteriorità per diritto d'autore e IP</strong> — Il certificato può essere
                            utilizzato come prova di anteriorità temporale in controversie riguardanti
                            diritto d'autore, proprietà intellettuale, accordi contrattuali, segreti industriali.
                        </LegalPoint>
                    </ul>
                </Section>

                {/* Cosa NON dimostra */}
                <Section
                    index={1}
                    icon="⚠️"
                    title="Cosa NON dimostra da solo"
                    accent="amber"
                >
                    <p className="text-sm text-white/65 leading-relaxed mb-4">
                        Sigillo è uno strumento potente, ma ha limiti precisi che devi conoscere.
                    </p>
                    <ul className="space-y-3">
                        <LegalPoint icon="👤">
                            <strong>Non prova la paternità</strong> — Il certificato attesta che <em>qualcuno</em> aveva
                            quel file in quel momento. Non prova automaticamente che sei tu l'autore.
                            {' '}<span className="text-amber-400/80">Soluzione: includi il tuo nome, la data e una firma nel documento
                            prima di certificarlo.</span>
                        </LegalPoint>
                        <LegalPoint icon="📄">
                            <strong>Non sostituisce un contratto firmato</strong> — Se stai certificando un contratto,
                            tutte le parti devono aver accettato il contenuto prima della certificazione.
                            Il certificato prova che il file esiste da quella data, non che le parti abbiano firmato.
                        </LegalPoint>
                        <LegalPoint icon="🏛️">
                            <strong>Non è una firma elettronica qualificata (QES)</strong> — Sigillo fornisce
                            un timestamp semplice, non una firma elettronica qualificata ai sensi eIDAS.
                            Per atti che richiedono firma qualificata (es. atti notarili, contratti immobiliari)
                            è necessario un QTSP certificato.
                        </LegalPoint>
                    </ul>
                </Section>

                {/* Livello eIDAS */}
                <Section
                    index={2}
                    icon="🇪🇺"
                    title="Posizione nel quadro eIDAS"
                    accent="teal"
                >
                    <div className="space-y-4">
                        <p className="text-sm text-white/65 leading-relaxed">
                            Il Regolamento eIDAS (910/2014/UE) definisce diversi livelli di firma e timestamp elettronico.
                            Ecco dove si posiziona Sigillo:
                        </p>

                        <div className="space-y-2">
                            <EidasRow
                                level="Sigillo oggi"
                                desc="Timestamp semplice (art. 3 eIDAS) + ancoraggio blockchain"
                                active
                            />
                            <EidasRow
                                level="Prossimo step"
                                desc="Timestamp avanzato via TSA accreditata (AdES)"
                            />
                            <EidasRow
                                level="Futuro con EGI-Credential"
                                desc="Firma elettronica avanzata (AdES) con identità verificata"
                            />
                        </div>

                        <div
                            className="rounded-xl p-4 text-sm text-white/60 leading-relaxed"
                            style={{ background: 'rgba(14,165,164,0.07)', border: '1px solid rgba(14,165,164,0.20)' }}
                        >
                            <strong className="text-[var(--accent)]">Equivalente pratico:</strong>{' '}
                            il timestamp semplice è comparabile a una lettera raccomandata con ricevuta di ritorno
                            che attesta la data di spedizione. Non prova il contenuto del mittente, ma prova
                            che quel contenuto esisteva in quella data.
                        </div>
                    </div>
                </Section>

                {/* Casi d'uso concreti */}
                <Section
                    index={3}
                    icon="💼"
                    title="Casi d'uso concreti"
                    accent="blue"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <UseCase title="Software e codice sorgente">
                            Certifica la versione di un software prima del rilascio.
                            In caso di disputa sulla paternità, hai la prova che il codice esisteva in quella forma.
                        </UseCase>
                        <UseCase title="Opere creative">
                            Fotografie, musica, testi, design. Prima che escano, certificali.
                            Vale come prova di anteriorità nel diritto d'autore.
                        </UseCase>
                        <UseCase title="NDA e accordi preliminari">
                            Certifica la bozza di un accordo prima di inviarla alla controparte.
                            Prova che le condizioni erano quelle in quella data.
                        </UseCase>
                        <UseCase title="Perizie e rapporti tecnici">
                            Documenti professionali la cui integrità nel tempo è importante
                            (CTU, perizie, consulenze tecniche).
                        </UseCase>
                        <UseCase title="Segreti industriali e know-how">
                            Brevetti, formule, processi. Certifica prima di depositare la domanda
                            per avere una data certa di priorità.
                        </UseCase>
                        <UseCase title="Documentazione di progetto">
                            Verbali, decisioni, stato avanzamento lavori. Proteggi la cronologia
                            di un progetto complesso da possibili contestazioni.
                        </UseCase>
                    </div>
                </Section>

                {/* Come usarlo correttamente */}
                <Section
                    index={4}
                    icon="📋"
                    title="Come usarlo correttamente"
                    accent="teal"
                >
                    <ol className="space-y-4">
                        {[
                            {
                                n: '1',
                                title: 'Includi i metadati nel documento',
                                text: 'Inserisci nome, data, e se necessario firma nel file prima di certificarlo. Il certificato prova il contenuto del file — se il tuo nome è nel file, prova anche la tua paternità.',
                            },
                            {
                                n: '2',
                                title: 'Certifica prima di pubblicare',
                                text: 'L\'effetto è massimo se certifichi prima di rendere pubblico il contenuto. Certificare qualcosa già pubblicato è ancora utile, ma meno forte come prova di anteriorità.',
                            },
                            {
                                n: '3',
                                title: 'Conserva il file originale',
                                text: 'Sulla blockchain è registrata solo l\'impronta SHA-256, non il file. Per verificare il certificato servirà sempre il file originale byte per byte. Conservalo su più supporti.',
                            },
                            {
                                n: '4',
                                title: 'Abbina a consulenza legale per atti importanti',
                                text: 'Per contratti significativi, proprietà intellettuale di valore elevato o dispute legali, Sigillo è un\'ottima base — ma affiancalo sempre a un consulente legale che sappia usarlo correttamente in giudizio.',
                            },
                        ].map((step) => (
                            <li key={step.n} className="flex gap-4">
                                <span
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                                    style={{ background: 'rgba(14,165,164,0.20)', color: 'var(--accent)' }}
                                    aria-hidden="true"
                                >
                                    {step.n}
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-white/80 mb-1">{step.title}</p>
                                    <p className="text-xs text-white/50 leading-relaxed">{step.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Section>

                {/* CTA */}
                <div className="text-center pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/sigillo')}
                        className="px-6 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                        style={{ background: 'var(--accent)', color: '#0A1222' }}
                    >
                        Certifica il tuo file →
                    </button>
                    <p className="text-xs text-white/25 mt-3">
                        Per domande legali specifiche: privacy@florenceegi.com
                    </p>
                </div>

            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Componenti interni
// ---------------------------------------------------------------------------

function Section({
    index, icon, title, accent, children,
}: {
    index: number;
    icon: string;
    title: string;
    accent: 'emerald' | 'amber' | 'teal' | 'blue';
    children: React.ReactNode;
}) {
    const borderColors = {
        emerald: 'rgba(16,185,129,0.25)',
        amber:   'rgba(245,158,11,0.25)',
        teal:    'rgba(14,165,164,0.25)',
        blue:    'rgba(59,130,246,0.25)',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl p-6"
            style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${borderColors[accent]}`,
            }}
        >
            <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" aria-hidden="true">{icon}</span>
                <h2 className="text-base font-bold text-white/85">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}

function LegalPoint({ icon, children }: { icon: string; children: React.ReactNode }) {
    return (
        <li className="flex gap-3 text-xs text-white/60 leading-relaxed">
            <span className="shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
            <span>{children}</span>
        </li>
    );
}

function EidasRow({ level, desc, active = false }: { level: string; desc: string; active?: boolean }) {
    return (
        <div
            className="flex items-start gap-3 rounded-lg px-3 py-2.5"
            style={{
                background: active ? 'rgba(14,165,164,0.10)' : 'rgba(255,255,255,0.03)',
                border: active ? '1px solid rgba(14,165,164,0.30)' : '1px solid rgba(255,255,255,0.07)',
            }}
        >
            <span
                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{ background: active ? 'var(--accent)' : 'rgba(255,255,255,0.20)' }}
                aria-hidden="true"
            />
            <div>
                <p className="text-xs font-semibold text-white/70">{level}</p>
                <p className="text-xs text-white/40">{desc}</p>
            </div>
        </div>
    );
}

function UseCase({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
            <p className="text-xs font-semibold text-white/70 mb-1.5">{title}</p>
            <p className="text-xs text-white/40 leading-relaxed">{children}</p>
        </div>
    );
}
