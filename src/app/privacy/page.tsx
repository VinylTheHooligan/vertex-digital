import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Privacy() {

    return (
        <>
            <Header />
            <main className="flex flex-col gap-10 mx-3 mb-10">
                <h1>Politique de confidentialité</h1>
                <div className="flex flex-col gap-15">
                    <section>
                        <h2 className="mb-3">1. Données collectées</h2>
                        <p>
                            Lorsque vous utilisez le formulaire de contact, les données suivantes sont collectées : <br/><br/>

                            - <b>Adresse email </b>(fournie volontairement)<br/>
                            - <b>Adresse IP</b> (collectée automatiquement pour des raisons de sécurité)<br/><br/>

                            Aucun autre type de donnée n&apos;est collecté.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">2. Finalité de la collecte</h2>
                        <p>
                            Ces données sont utilisées uniquement pour :<br/><br/>

                            - répondre aux messages envoyés via le formulaire<br/>
                            - assurer la sécurité du site (anti-spam, prévention des abus)<br/>

                            Aucune donnée n&apos;est utilisée à des fins commerciales ou publicitaires.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">3. Base légale</h2>
                        <p>
                            La collecte repose sur :<br/><br/>

                                - <b>l&apos;intérêt légitime</b> (sécurisation du site)<br/>
                                - <b>l&apos;exécution d&apos;un contrat</b> (réponse à une demande envoyée via le formulaire)<br/>
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">4. Durée de conservation</h2>
                        <p>
                            Les données sont accessibles uniquement à :<br/><br/>

                            - Emails : <b>12 mois maximum</b><br/>
                            - Adresse IP : <b>30 jours, sauf nécessité de sécurité prolongée</b><br/><br/>

                            Aucune donnée n&apos;est vendue, cédée ou transférée à des tiers.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">5. Destinataires</h2>
                        <p>
                            Les données sont accessibles uniquement à :<br/><br/>

                            - l&apos;<b>éditeur du site</b> (William Salembien)<br/>
                            - l&apos;hébergeur (OVH) en cas de nécessité technique ou judiciaire<br/><br/>

                            Aucune donnée n&apos;est vendue, cédée ou transférée à des tiers.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">6. Droits des utilisateurs</h2>
                        <p>
                            Conformément au RGPD, vous disposez des droits suivants :<br/><br/>

                            - droit d&apos;accès<br/>
                            - droit de rectification<br/>
                            - droit d&apos;effacement<br/>                      
                            - droit d&apos;opposition<br/>                         
                            - droit à la limitation du traitement<br/><br/>
                                
                            Pour exercer vos droits : william.salembien@outlook.com
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">7. Cookies</h2>
                        <p>
                            Ce site <b>n&apos;utilise aucun cookie nécessitant votre consentement</b>.<br/>
                            Seuls des cookies techniques indispensables au fonctionnement du site peuvent être utilisés.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">8. Sécurité</h2>
                        <p>
                            Les données sont protégées par :<br/><br/>

                            - protocole HTTPS<br/>
                            - mesures anti‑spam<br/>
                            - stockage sécurisé<br/>
                            - accès limité aux seules personnes autorisées<br/>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}