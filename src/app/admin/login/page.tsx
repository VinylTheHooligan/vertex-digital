import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/form/LoginForm";

export default function LoginPage() {

    return (
        <>
            <Header />
            <main className="flex flex-col items-center">
                <div className="grid grid-cols-1 gap-2 mx-3 sm:w-100">
                    <h2>Accès administrateur</h2>
                    <span className="inline-block text-center">Toute tentative malicieuse désactivera l&apos;accès jusqu&apos;à l&apos;intervention d&apos;un administrateur.</span>
                    <LoginForm />
                </div>
            </main>
            <Footer />
        </>
    );
}