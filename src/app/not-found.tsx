import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function NotFound() {

    return (
        <>
            <Header />
            <main>
                <div className="flex flex-col items-center my-19">
                    <h2 className="text-8xl">404</h2>
                    <h2>Page introuvable !</h2>
                    <p className="text-center">Vous essayez d'accéder à une page qui n'existe pas !</p>
                    <Link className="form-button px-4" href="/">Retour au site</Link>
                </div>
            </main>
            <Footer />
        </>
    );
}