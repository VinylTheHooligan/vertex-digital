import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PER_PAGE = 10;

export default async function AdminContact({ searchParams }: { searchParams: Promise<{ page?: string }>}) {

    const { page } = await searchParams;
    const currentPage = Number(page ?? 1);

    const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
            orderBy: { createdAt: 'desc' },
            take: PER_PAGE,
            skip: (currentPage - 1) * PER_PAGE,
        }),
        prisma.contact.count(),
    ]);

    const totalPages = Math.ceil(total / PER_PAGE);

    return (
        <>
            <Header />
            <main className="flex flex-col mx-3">
                <h2>Contact</h2>
                <div className="grid grid-cols-1 gap-5 mt-5">
                    {contacts.map(contact => (
                        <div key={contact.id} className="flex flex-col ring-2 ring-foreground px-3 py-2 rounded-xl">
                            <span className="ring-2 bg-foreground text-background font-extrabold w-fit px-2 rounded-2xl self-end cursor-pointer">Ban</span>
                            <div>
                                <span className="font-semibold">De : <span className="font-normal ml-3">{contact.from}</span></span>
                            </div>
                            <div>
                                <span className="font-semibold">IP : <span className="font-normal ml-3">{contact.ip}</span></span>
                            </div>
                            <div>
                                <span className="font-semibold">Sujet : <span className="font-normal ml-3">{contact.subject}</span></span>
                            </div>
                            <div>
                                <span className="font-semibold">Le : <span className="font-normal ml-3">{contact.createdAt.toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}</span></span>
                            </div>
                            <div className="mt-5">
                                <span className="font-semibold">Message :</span>
                                <p>{contact.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-3 mt-5">
                    {currentPage > 1 && (
                        <Link href={`/admin/contacts?page=${currentPage - 1}`}>Précédent</Link>
                    )}
                    <span>{currentPage} / {totalPages}</span>
                    {currentPage < totalPages && (
                        <Link href={`/admin/contacts?page=${currentPage + 1}`}>Suivant</Link>
                    )}
                </div>
                <Link href="/admin" className="form-button mt-5 mx-5">Retour au menu</Link>
            </main>
        </>
    );
}