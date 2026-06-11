import ContactForm from '@/components/form/ContactForm';

export default function Contact() {

    return (
        <section id="contact-me" className="flex flex-col items-center">
            <div className="grid grid-cols-1 mt-15 gap-2 pt-10 sm:w-150">
                <h2>Me contacter</h2>
                <span className="inline-block text-center">Ce formulaire est réservé aux sollicitations professionnelles.</span>
                <ContactForm />
                <span className="text-xs text-center">Vous pouvez également me joindre par mail : <a className="font-bold" href="mailto:contact@vertex-digital.fr">contact@vertex-digital.fr</a></span>
            </div>
        </section>
    );
}