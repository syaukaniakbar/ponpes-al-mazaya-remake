import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { BookOpen, GraduationCap, Layers, School } from 'lucide-react';
import type { StudentCount } from '../../types/index';

// ====== Type & Data ======
type Highlight = {
    title: string;
    description: string;
    icon?: LucideIcon | null;
    count: number;
};

type Props = {
    studentCounts: StudentCount[];
};

const programData = [
    {
        title: 'Wustha',
        description: 'Program menengah berbasis Qur’ani untuk membangun pondasi ilmu agama dan pengetahuan umum.',
        icon: BookOpen,
        field: 'wustha',
    },
    {
        title: 'Ulya',
        description: 'Jenjang lanjutan memperdalam keilmuan Islam, akhlak mulia, dan wawasan global.',
        icon: GraduationCap,
        field: 'ulya',
    },
    {
        title: 'MTs',
        description: 'Madrasah Tsanawiyah dengan kurikulum nasional yang diperkaya sentuhan islami modern.',
        icon: School,
        field: 'mts',
    },
    {
        title: 'MA',
        description: 'Madrasah Aliyah untuk menyiapkan generasi Qur’ani siap melanjutkan pendidikan tinggi.',
        icon: Layers,
        field: 'ma',
    },
];

export default function HighlightSection({ studentCounts }: Props) {
    // Get the latest student count data
    const latestData = studentCounts.length > 0 ? studentCounts[studentCounts.length - 1] : null;

    // Create highlights with actual data
    const highlights: Highlight[] = latestData
        ? programData.map((program) => ({
              title: program.title,
              description: program.description,
              icon: program.icon,
              count: latestData[program.field as keyof StudentCount] as number,
          }))
        : programData.map((program) => ({
              ...program,
              count: 0,
          }));

    return (
        <section className="relative z-10 bg-white py-28">
            <div className="mx-auto max-w-6xl px-7 text-center md:px-12">
                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-3 text-sm font-medium tracking-wider text-green-600 uppercase"
                >
                    Pilihan Pendidikan
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl"
                >
                    Program <span className="text-green-600">Unggulan</span>
                </motion.h2>

                {/* Short description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-16 max-w-2xl text-base text-gray-600"
                >
                    Kami menghadirkan program pendidikan yang memadukan nilai Qur’ani, akademik, dan keterampilan modern untuk membentuk generasi
                    berakhlak mulia serta berwawasan global.
                </motion.p>

                {/* Grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group flex flex-col items-center rounded-2xl bg-gray-50 p-10 shadow-sm transition hover:bg-white hover:shadow-lg"
                        >
                            {/* Icon */}
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition-transform group-hover:scale-110">
                                {item.icon && <item.icon className="h-10 w-10 text-green-500" aria-hidden="true" />}
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>

                            {/* Count */}
                            <div className="mb-3 text-3xl font-extrabold text-green-600">{item.count.toLocaleString()}+</div>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
