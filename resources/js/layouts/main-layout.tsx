import Footer from '@/components/custom/footer';
import Navbar from '@/components/custom/navbar';
import { Head } from '@inertiajs/react';

interface MainLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function MainLayout({
    children,
    title,
    description,
}: MainLayoutProps) {
    return (
        <>
            <Head title={title}>
                <meta name="description" content={description} />
            </Head>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
