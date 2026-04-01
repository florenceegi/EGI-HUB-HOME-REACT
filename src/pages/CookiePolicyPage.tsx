/**
 * @package EGI-HUB-HOME — CookiePolicyPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME)
 * @date 2026-04-01
 * @purpose Pagina informativa Cookie Policy — florenceegi.com
 */

export const CookiePolicyPage = () => (
    <div className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
            <button onClick={() => window.history.back()} className="text-sm text-gray-500 hover:text-white transition-colors mb-10 block">← Torna indietro</button>
            <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
            <p className="text-gray-500 text-sm mb-10">Ultimo aggiornamento: 1 aprile 2026</p>

            <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Cosa sono i cookie</h2>
                    <p>I cookie sono piccoli file di testo salvati nel browser durante la navigazione. Questo sito ne fa un uso minimo e non invasivo.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Cookie tecnici</h2>
                    <p>Questo sito utilizza <code className="bg-white/10 px-1 rounded text-sm">localStorage</code> esclusivamente per salvare la preferenza di lingua selezionata dall'utente. Non si tratta di un cookie ma di un dato di preferenza locale, non trasmesso a nessun server.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Analytics interni</h2>
                    <p>Viene utilizzato il sistema di analytics interno FlorenceEGI (FEAnalytics) che raccoglie dati anonimi di navigazione. Nessun dato personale viene salvato. Nessun cookie di profilazione viene installato.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Cookie di terze parti</h2>
                    <p>Questo sito carica font tipografici da Google Fonts. Google potrebbe ricevere l'indirizzo IP anonimizzato del visitatore come parte normale del protocollo HTTP. Per maggiori informazioni: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Google Privacy Policy</a>.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Come disabilitare i cookie</h2>
                    <p>Puoi disabilitare i cookie dalle impostazioni del tuo browser. Tieni presente che disabilitare i cookie tecnici potrebbe influire sul funzionamento di alcune funzionalità del sito.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Contatti</h2>
                    <p>Per qualsiasi domanda: <a href="mailto:info@florenceegi.com" className="text-purple-400 hover:text-purple-300">info@florenceegi.com</a></p>
                </section>
            </div>
        </div>
    </div>
);
