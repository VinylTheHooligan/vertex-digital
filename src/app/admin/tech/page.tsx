import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteTechnology } from "@/app/actions/technology";
import { Technology } from "@/generated/prisma/browser";

export default async function AdminTech() {

    const technologies = await prisma.technology.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <>
            <Header />
            <div className="mx-5">
                <h2>Technologies</h2>
                <div className="flex flex-col mt-5 gap-6">
                    <div className="flex justify-end">
                        <Link href="/admin/tech/create" className="form-button w-fit px-4">Créer</Link>
                    </div>
                    <div className="grid grid-cols-1 ring-2 rounded-sm">
                        { technologies.map((tech: Technology) => (
                            <div className="flex place-items-center gap-3 mx-4 my-4" key={tech.id}>
                                <img className="w-10" style={{ filter: 'var(--logo-filter)' }} src={tech.logo} />
                                <span className="font-bold">{tech.name}</span>
                                <div className="flex justify-end w-full mr-1">
                                    <form action={async () => {
                                        "use server";
                                        await deleteTechnology(tech.id);
                                    }}>
                                        <button type="submit" className="form-button mt-0 w-12">X</button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Link href="/admin" className="form-button mt-5 mx-5">Retour au menu</Link>
        </>
    );
}