/**
 * @package EGI-HUB-HOME — PrivacyPolicyPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME)
 * @date 2026-04-01
 * @purpose Pagina informativa Privacy Policy — florenceegi.com
 */

export const PrivacyPolicyPage = () => (
    <div className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
            <button onClick={() => window.history.back()} className="text-sm text-gray-500 hover:text-white transition-colors mb-10 block">← Torna indietro</button>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-500 text-sm mb-10">Ultimo aggiornamento: 1 aprile 2026</p>

            <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Titolare del trattamento</h2>
                    <p>FlorenceEGI S.r.l.<br />Email: <a href="mailto:info@florenceegi.com" className="text-purple-400 hover:text-purple-300">info@florenceegi.com</a></p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Dati raccolti</h2>
                    <p>Questo sito raccoglie esclusivamente dati anonimi di navigazione tramite il sistema di analytics interno FlorenceEGI (FEAnalytics). Non vengono raccolti dati personali identificabili.</p>
                    <p className="mt-3">I dati raccolti includono:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                        <li>Pagine visitate</li>
                        <li>Durata della sessione</li>
                        <li>Tipo di dispositivo e browser (anonimizzati)</li>
                        <li>Paese di provenienza (solo a livello nazionale, non geolocalizzazione precisa)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Finalità del trattamento</h2>
                    <p>I dati anonimi vengono utilizzati esclusivamente per migliorare l'esperienza utente e monitorare le prestazioni del sito. Non vengono condivisi con terze parti né utilizzati per profilazione commerciale.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Base giuridica</h2>
                    <p>Il trattamento si basa sul legittimo interesse del titolare (art. 6.1.f GDPR) al miglioramento del servizio, in quanto i dati sono completamente anonimi e non consentono l'identificazione degli utenti.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Conservazione</h2>
                    <p>I dati anonimi di analytics vengono conservati per un massimo di 12 mesi.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Diritti degli utenti</h2>
                    <p>Poiché non vengono trattati dati personali identificabili, non è tecnicamente possibile esercitare i diritti di accesso, rettifica o cancellazione su dati già raccolti. Per qualsiasi domanda: <a href="mailto:info@florenceegi.com" className="text-purple-400 hover:text-purple-300">info@florenceegi.com</a></p>
                </section>
            </div>
        </div>
    </div>
);
