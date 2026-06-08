import Header from "@/src/components/Header";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

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
                        { technologies.map(tech => (
                            <div key={tech.id}>
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}