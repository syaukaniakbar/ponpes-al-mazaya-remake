// Footer.tsx
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react';
import React, { ReactNode } from 'react';

export interface PageLink {
    name: string;
    href: string;
}

export interface ContactLink {
    name: string;
    href: string;
    icon: ReactNode; // bisa pakai ReactNode karena icon adalah JSX
}

// contoh data
const pagesLinks: PageLink[] = [{ name: 'Beranda', href: '/' }];

const contactLinks: ContactLink[] = [
    {
        name: 'Instagram',
        href: 'https://instagram.com',
        icon: <Instagram size={24} />,
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com',
        icon: <Facebook size={24} />,
    },
    {
        name: 'Youtube',
        href: 'https://youtube.com',
        icon: <Youtube size={24} />,
    },
    {
        name: 'Email',
        href: 'mailto:info@al-mazaya.sch.id',
        icon: <Mail size={24} />,
    },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-green-900 text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-14 sm:flex-row sm:items-start sm:justify-between sm:gap-12 sm:px-12 sm:py-16">
                {/* Branding */}
                <div className="text-left sm:w-1/3">
                    <img
                        src="/images/logo_al_mazaya_2.png"
                        alt="Logo Al-Mazaya"
                        className="mb-5 h-14 w-auto sm:h-12"
                    />
                    <p className="text-3xl font-bold sm:text-2xl">
                        Ponpes Al-Mazaya
                    </p>
                    <p className="mt-3 text-base text-gray-200 sm:text-sm">
                        Yayasan Pendidikan Islam Az Zaini Al Azhari Paser
                    </p>
                </div>

                {/* Halaman */}
                <div className="text-left sm:w-1/4">
                    <h3 className="mb-4 text-xl font-semibold text-white sm:text-lg">
                        Halaman
                    </h3>
                    <ul className="space-y-3 text-xl text-gray-200 sm:space-y-2 sm:text-sm">
                        {pagesLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="transition-colors duration-200 hover:text-green-400"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kontak / Sosial Media */}
                <div className="text-left sm:w-1/4">
                    <h3 className="mb-4 text-xl font-semibold text-white sm:text-lg">
                        Kontak
                    </h3>
                    <ul className="flex flex-col gap-4 sm:gap-3">
                        {contactLinks.map((contact) => (
                            <li
                                key={contact.name}
                                className="flex items-center gap-3"
                            >
                                <span className="h-7 w-7 text-white sm:h-5 sm:w-5">
                                    {contact.icon}
                                </span>
                                <a
                                    href={contact.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={contact.name}
                                    className="text-xl transition-colors duration-200 hover:text-green-400 sm:text-sm"
                                >
                                    {contact.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-green-800 px-6 py-6 text-center text-sm text-gray-300 sm:p-4">
                &copy; 2025 Ponpes Al-Mazaya. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
