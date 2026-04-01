/**
 * @package EGI-HUB-HOME — TermsPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME)
 * @date 2026-04-01
 * @purpose Pagina informativa Termini di Utilizzo — florenceegi.com
 */

export const TermsPage = () => (
    <div className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
            <button onClick={() => window.history.back()} className="text-sm text-gray-500 hover:text-white transition-colors mb-10 block">← Torna indietro</button>
            <h1 className="text-3xl font-bold mb-2">Termini di Utilizzo</h1>
            <p className="text-gray-500 text-sm mb-10">Ultimo aggiornamento: 1 aprile 2026</p>

            <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Natura del sito</h2>
                    <p>florenceegi.com è un sito informativo pubblico di FlorenceEGI S.r.l. Non richiede registrazione e non offre servizi a pagamento direttamente su questo dominio.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Proprietà intellettuale</h2>
                    <p>Tutti i contenuti presenti su questo sito — testi, grafica, codice, marchi e concetti — sono di proprietà esclusiva di FlorenceEGI S.r.l. e sono protetti su blockchain Algorand.</p>
                    <p className="mt-3">È vietata la riproduzione, copia, distribuzione o modifica di qualsiasi contenuto senza autorizzazione scritta.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Limitazione di responsabilità</h2>
                    <p>Le informazioni presenti su questo sito hanno scopo puramente illustrativo. FlorenceEGI S.r.l. non garantisce la completezza o l'aggiornamento dei contenuti e non è responsabile per decisioni prese sulla base di tali informazioni.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Legge applicabile</h2>
                    <p>I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il Foro di Firenze.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Contatti</h2>
                    <p><a href="mailto:info@florenceegi.com" className="text-purple-400 hover:text-purple-300">info@florenceegi.com</a></p>
                </section>
            </div>
        </div>
    </div>
);
