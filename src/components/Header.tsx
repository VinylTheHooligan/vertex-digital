"use client";

import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";

export default function Header() {

    const {isDark, toggle} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 grid-rows-1 backdrop-blur-xs backdrop-brightness-85 py-4 mb-10">
            <Link className="col-start-2 flex justify-center" href="/">
                <svg className="w-20 md:w-20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1279.31 799.98">
                    <polygon points="876.29 222.63 674.87 539.23 629.89 609.92 576.11 694.46 508.97 799.98 390.01 613.01 510.94 422.94 638.38 222.63 876.29 222.63" />
                    <polygon points="473.91 364.74 352.98 554.81 279.3 439 141.64 222.63 0 0 241.85 0 383.49 222.63 400.23 248.93 473.91 364.74" />
                    <path d="M1213.3,539.23c-61.42,82.14-161.04,141.47-278.68,155.23h-284.47l16.77-26.35,82-128.88h185.7c100.61-13.1,174.67-100.91,171.08-199.15-2.78-75.96-51.43-142.79-120.95-171.52-15.73-6.51-32.54-11.06-50.13-13.33h-474.78L558.6,0h376.02c25.47,2.94,50.12,8.03,73.75,15.03,20.72,6.14,40.64,13.76,59.63,22.69,59.24,27.87,109.36,68.58,145.89,117.51,38.99,52.21,62.51,113.77,65.17,179.07,3.04,74.48-21.41,145.65-65.76,204.93Z" />
                </svg>
            </Link>
            <div className="flex items-center justify-end mx-5">
                {mounted && (
                    <div className="relative rounded-full duration-300 w-16 h-8 ring-2 ring-foreground">
                        <label className="relative inline-flex cursor-pointer h-8 w-16 select-none">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={isDark}
                              onChange={toggle}
                            />
                            <div className={`absolute left-1 top-1 h-6 w-6 rounded-full     bg-foreground duration-300 flex items-center justify-center
                            ${isDark ? "translate-x-8" : "translate-x-0"}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 64 64"
                                    className={`absolute w-4 h-4 text-background  transition-opacity duration-300 ${isDark ? "opacity-0" :    "opacity-100"}`}
                                    fill="currentColor"
                                >
                                    <g>
                                    <circle fillRule="evenodd" clipRule="evenodd" cx="32.003" cy="32.005" r="16.001"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.001,31.997c0-2.211-1.789-4-4-4H4c-2.211,0-4,1.789-4,4s1.789,4,4,4h4C10.212,35.997,12.001,34.208,12.001,31.997z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.204,46.139l-2.832,2.833c-1.563,1.562-1.563,4.094,0,5.656c1.562,1.562,4.094,1.562,5.657,0l2.833-2.832c1.562-1.562,1.562-4.095,0-5.657C16.298,44.576,13.767,44.576,12.204,46.139z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M32.003,51.999c-2.211,0-4,1.789-4,4V60c0,2.211,1.789,4,4,4s4-1.789,4-4l-0.004-4.001C36.003,53.788,34.21,51.999,32.003,51.999z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M51.798,46.143c-1.559-1.566-4.091-1.566-5.653-0.004s-1.562,4.095,0,5.657l2.829,2.828c1.562,1.57,4.094,1.562,5.656,0s1.566-4.09,0-5.656L51.798,46.143z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M60.006,27.997l-4.009,0.008c-2.203-0.008-3.992,1.781-3.992,3.992c-0.008,2.211,1.789,4,3.992,4h4.001c2.219,0.008,4-1.789,4-4C64.002,29.79,62.217,27.997,60.006,27.997z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M51.798,17.859l2.828-2.829c1.574-1.566,1.562-4.094,0-5.657c-1.559-1.567-4.09-1.567-5.652-0.004l-2.829,2.836c-1.562,1.555-1.562,4.086,0,5.649C47.699,19.426,50.239,19.418,51.798,17.859z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M32.003,11.995c2.207,0.016,4-1.789,4-3.992v-4c0-2.219-1.789-4-4-4c-2.211-0.008-4,1.781-4,3.993l0.008,4.008C28.003,10.206,29.792,11.995,32.003,11.995z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.212,17.855c1.555,1.562,4.079,1.562,5.646-0.004c1.574-1.551,1.566-4.09,0.008-5.649l-2.829-2.828c-1.57-1.571-4.094-1.559-5.657,0c-1.575,1.559-1.575,4.09-0.012,5.653L12.212,17.855z"/>
                                    </g>
                                </svg>
                                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={`absolute w-4 h-4 text-background transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
                                </svg>
                            </div>
                        </label>
                    </div>
                )}
            </div>
        </header>
    );
}