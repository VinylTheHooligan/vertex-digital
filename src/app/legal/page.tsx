import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Legal() {

    return (
        <>
            <Header />
            <main className="flex flex-col gap-10 mx-3 mb-10">
                <h1>Mentions légales</h1>
                <div className="flex flex-col gap-15">
                    <section>
                        <h2 className="mb-3">1. Éditeur du site</h2>
                        <p>
                            Ce site est édité par William Salembien - Vertex Digital, micro-entreprise enregistrée en France. <br/><br/>
                            <b>SIRET :</b> 99354869200017 <br/>
                            <b>Ville :</b> Dunkerque <br/><br/>
                            <i>L&apos;adresse complète du siège peut être communiquée sur demande légitime afin de protéger la vie privée de l&apos;éditeur.</i> <br/><br/>
                            <b>Email :</b> william.salembien@outlook.com <br/>
                            <b>Directeur de la publication :</b> William Salembien
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">2. Hébergement</h2>
                        <p>
                            Le site est hébergé par : <br/>
                            OVH SAS <br/>
                            2 rue Kellermann - 59100 Roubaix - France <br/>
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">3. Propriété intellectuelle</h2>
                        <p>
                            L&apos;ensemble du contenu du site (textes, images, code, éléments graphiques) est protégé par le droit d&apos;auteur.
                            Toute reproduction, modification ou diffusion sans autorisation est interdite.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">4. Responsabilité</h2>
                        <p>
                            L&apos;éditeur ne saurait être tenu responsable en cas : <br/><br/>
                    
                            - d&apos;erreurs ponctuelles, <br/>
                            - d&apos;indisponibilité du site, <br/>
                            - d&apos;utilisation inappropriée du contenu par l&apos;utilisateur. <br/>
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-3">5. Contact</h2>
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