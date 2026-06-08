import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col backdrop-brightness-75 py-5 mt-10">
            <div className="flex justify-center gap-5 mt-3">
                <svg className="w-20 md:w-20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1279.31 799.98">
                    <polygon points="876.29 222.63 674.87 539.23 629.89 609.92 576.11 694.46 508.97 799.98 390.01 613.01 510.94 422.94 638.38 222.63 876.29 222.63" />
                    <polygon points="473.91 364.74 352.98 554.81 279.3 439 141.64 222.63 0 0 241.85 0 383.49 222.63 400.23 248.93 473.91 364.74" />
                    <path d="M1213.3,539.23c-61.42,82.14-161.04,141.47-278.68,155.23h-284.47l16.77-26.35,82-128.88h185.7c100.61-13.1,174.67-100.91,171.08-199.15-2.78-75.96-51.43-142.79-120.95-171.52-15.73-6.51-32.54-11.06-50.13-13.33h-474.78L558.6,0h376.02c25.47,2.94,50.12,8.03,73.75,15.03,20.72,6.14,40.64,13.76,59.63,22.69,59.24,27.87,109.36,68.58,145.89,117.51,38.99,52.21,62.51,113.77,65.17,179.07,3.04,74.48-21.41,145.65-65.76,204.93Z" />
                </svg>
                <div className="flex flex-col justify-center font-bold mb-3">
                    <Link href={'/legal'}>Mentions légales</Link><Link href={'/privacy'}>Politique de confidentialité</Link>
                </div>
            </div>
            <span className="my-4 text-sm text-center">Copyright @ {currentYear} Vertex Digital - William Salembien</span>
        </footer>
    );
}