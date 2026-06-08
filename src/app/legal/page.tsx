import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Legal() {

    return (
        <>
            <Header />
            <main className="flex flex-col gap-10 mx-3 mb-10">
                <h2>Mentions légales</h2>
                <div className="flex flex-col gap-15">
                    <section>
                        <h3 className="mb-3">1. Éditeur du site</h3>
                        <p>
                            Ce site est édité par William Salembien - Vertex Digital, micro-entreprise enregistrée en France. <br/><br/>
                            <b>SIRET :</b> 99354869200017 <br/>
                            <b>Ville :</b> Dunkerque <br/><br/>
                            <i>L'adresse complète du siège peut être communiquée sur demande légitime afin de protéger la vie privée de l'éditeur.</i> <br/><br/>
                            <b>Email :</b> william.salembien@outlook.com <br/>
                            <b>Directeur de la publication :</b> William Salembien
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">2. Hébergement</h3>
                        <p>
                            Le site est hébergé par : <br/>
                            OVH SAS <br/>
                            2 rue Kellermann - 59100 Roubaix - France <br/>
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">3. Propriété intellectuelle</h3>
                        <p>
                            L'ensemble du contenu du site (textes, images, code, éléments graphiques) est protégé par le droit d'auteur.
                            Toute reproduction, modification ou diffusion sans autorisation est interdite.
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">4. Responsabilité</h3>
                        <p>
                            L'éditeur ne saurait être tenu responsable en cas : <br/><br/>
                    
                            - d'erreurs ponctuelles, <br/>
                            - d'indisponibilité du site, <br/>
                            - d'utilisation inappropriée du contenu par l'utilisateur. <br/>
                        </p>
                    </section>
                    <section>
                        <h3 className="mb-3">5. Contact</h3>
                        <p>
                            Pour toute question : william.salembien@outlook.com
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}