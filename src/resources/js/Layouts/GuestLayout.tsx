import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#1a1c23] pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <div className="text-3xl font-bold tracking-widest  bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
                        W//WizardStock
                    </div>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-[#24262d] px-6 py-4 shadow-2xl border border-gray-700 sm:max-w-md sm:rounded-xl">
                {children}
            </div>
        </div>
    );
}
