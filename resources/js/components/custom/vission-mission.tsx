'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';

// Type untuk data visi & misi
type VisionMission = {
    vision: string;
    visionDesc: string;
    missions: string[];
};

const visionMission: VisionMission = {
    vision: 'Mencetak Generasi Berilmu & Berakhlak',
    visionDesc:
        'Membangun insan Qur’ani yang beriman, beramal, berwawasan luas, serta siap menghadapi tantangan global dengan tetap berpegang pada nilai-nilai Islam.',
    missions: [
        'Menanamkan nilai-nilai iman, takwa, dan akhlak mulia sebagai fondasi karakter santri.',
        'Mengembangkan sistem pembelajaran terintegrasi yang mencakup ilmu (kognitif), amal (psikomotorik), dan akhlak (afektif).',
        'Memperluas wawasan santri melalui penguatan kearifan lokal dan perspektif global.',
        "Menerapkan manhaj Ahlusunnah wal Jama'ah dalam kurikulum dan praktik keagamaan.",
        'Meningkatkan kompetensi bahasa Arab dan Inggris mencakup empat keterampilan: istimâ’, qirâ’ah, kitâbah, dan kalâm.',
        'Melakukan regenerasi dan spesialisasi ilmu agama (tafsir, hadis, fiqh) secara sistematis.',
        'Mengintegrasikan kemampuan dasar teknologi informasi sebagai bekal di era digital.',
    ],
};

export default function VisionMissionSection() {
    return (
        <section className="relative z-10 bg-gray-50 py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
                {/* Subheading */}
                <div className="w-full text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-3 text-sm font-medium tracking-wide text-green-600 uppercase"
                    >
                        Landasan Pesantren
                    </motion.p>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl"
                    >
                        Visi <span className="text-green-600">dan</span> Misi
                    </motion.h2>

                    {/* Subhead */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mx-auto mb-14 max-w-2xl text-gray-600"
                    >
                        Sebagai pondok pesantren modern, Al-Mazaya berkomitmen membangun generasi Qur’ani yang siap menghadapi tantangan global dengan
                        tetap berpegang pada nilai-nilai Islam.
                    </motion.p>
                </div>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Text section */}
                    <div>
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-10"
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <Star className="h-6 w-6 text-green-600" />
                                <h3 className="text-xl font-semibold text-gray-800">Visi</h3>
                            </div>
                            <div className="rounded-2xl bg-green-50 p-6 shadow-md">
                                <p className="mb-3 text-2xl font-bold text-green-700">{visionMission.vision}</p>
                                <p className="text-gray-700">{visionMission.visionDesc}</p>
                            </div>
                        </motion.div>

                        {/* Mission */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">Misi</h3>
                            <ul className="space-y-4">
                                {visionMission.missions.map((mission, index) => (
                                    <li key={index} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
                                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                                        <p className="text-gray-700">{mission}</p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Image section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
                            <img src="/images/blog.jpg" alt="Santri Al-Mazaya dalam kegiatan belajar" className="h-full w-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-2xl bg-green-100" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
