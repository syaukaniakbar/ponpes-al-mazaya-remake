import { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src="/images/logo_al_mazaya.png"
                        alt="Logo"
                        className="h-8 w-auto"
                    />
                </div>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-3 md:flex">
                    <a
                        href="https://almazayapaser.ponpes.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                        Home
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <div className="flex flex-col gap-3 px-4 py-4">
                        <a
                            href="https://almazayapaser.ponpes.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                        >
                            Home
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
