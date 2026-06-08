import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function Privacy() {

    return (
        <>
            <Header />
            <main className="flex flex-col gap-10 mx-3 mb-10">
                <h2>Politique de confidentialité</h2>
                <div className="flex flex-col gap-15">
                    <section>
                        <h3 className="mb-3">1. Données collectées</h3>
                        <p>
                            Lorsque vous utilisez le formulaire de contact, les données suivantes sont collectées : <br/><br/>

                            - <b>Adresse email </b>(fournie volontairement)<br/>
                            - <b>Adresse IP</b> (collectée automatiquement pour des raisons de sécurité)<br/><br/>

                            Aucun autre type de donnée n'est collecté.
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">2. Finalité de la collecte</h3>
                        <p>
                            Ces données sont utilisées uniquement pour :<br/><br/>

                            - répondre aux messages envoyés via le formulaire<br/>
                            - assurer la sécurité du site (anti-spam, prévention des abus)<br/>

                            Aucune donnée n'est utilisée à des fins commerciales ou publicitaires.
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">3. Base légale</h3>
                        <p>
                            La collecte repose sur :<br/><br/>

                                - <b>l'intérêt légitime</b> (sécurisation du site)<br/>
                                - <b>l'exécution d'un contrat</b> (réponse à une demande envoyée via le formulaire)<br/>
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">4. Durée de conservation</h3>
                        <p>
                            Les données sont accessibles uniquement à :<br/><br/>

                            - Emails : <b>12 mois maximum</b><br/>
                            - Adresse IP : <b>30 jours, sauf nécessité de sécurité prolongée</b><br/><br/>

                            Aucune donnée n'est vendue, cédée ou transférée à des tiers.
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">5. Destinataires</h3>
                        <p>
                            Les données sont accessibles uniquement à :<br/><br/>

                            - l'<b>éditeur du site</b> (William Salembien)<br/>
                            - l'hébergeur (OVH) en cas de nécessité technique ou judiciaire<br/><br/>

                            Aucune donnée n'est vendue, cédée ou transférée à des tiers.
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">6. Droits des utilisateurs</h3>
                        <p>
                            Conformément au RGPD, vous disposez des droits suivants :<br/><br/>

                            - droit d'accès<br/>
                            - droit de rectification<br/>
                            - droit d'effacement<br/>                      
                            - droit d'opposition<br/>                         
                            - droit à la limitation du traitement<br/><br/>
                                
                            Pour exercer vos droits : william.salembien@outlook.com
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">7. Cookies</h3>
                        <p>
                            Ce site <b>n'utilise aucun cookie nécessitant votre consentement</b>.<br/>
                            Seuls des cookies techniques indispensables au fonctionnement du site peuvent être utilisés.
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">8. Sécurité</h3>
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