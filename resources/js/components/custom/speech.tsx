import { motion } from 'framer-motion';

export default function Speech() {
    return (
        <section id="speech" className="z-10 border-y border-gray-200 bg-gray-50 py-28">
            <div className="mx-auto max-w-4xl px-7 text-center md:px-12">
                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-base font-medium tracking-wider text-green-700 uppercase"
                >
                    Sambutan Pimpinan
                </motion.p>

                {/* Main Text / Quote */}
                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 border-l-4 border-green-600 pl-6 text-left text-lg leading-relaxed text-gray-700 italic md:text-center md:text-xl"
                >
                    <p className="mb-4">
                        Bersyukur kepada Allah Subhanahu Wa Ta’ala, Pondok Pesantren Al Mazaya Paser hadir sejak 2021 dengan visi sederhana: mengubah
                        mimpi santri menjadi nyata. Dari dua rumah sewaan, kini kami melihat generasi berakar iman, bersayap ilmu, dan berhati kokoh
                        melanjutkan studi ke Al Azhar Mesir.
                    </p>
                    <p>
                        Setiap langkah ini adalah buah doa, kerja keras, dan dukungan Anda semua. Terima kasih. Mari terus bersama menanam benih
                        cahaya untuk masa depan umat dan bangsa.
                    </p>
                </motion.blockquote>

                {/* Author */}
                <motion.cite
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 flex flex-col items-center not-italic"
                >
                    {/* Optional Foto Pimpinan */}
                    <img
                        src="/staff-teacher/mardani.jpg"
                        alt="Foto H. Nashruddin, Pimpinan Ponpes Al-Mazaya"
                        className="mb-4 h-20 w-20 rounded-full object-cover shadow-lg"
                    />

                    <h4 className="text-xl font-semibold text-gray-900">H. Nashruddin, Lc, M.Pd</h4>
                    <p className="text-base text-gray-600">Pengasuh Pondok Pesantren Al Mazaya</p>
                </motion.cite>
            </div>
        </section>
    );
}
