'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function Address() {
    return (
        <section className="relative z-10 bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
                {/* Heading */}
                <div className="mb-14 w-full text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
                    >
                        Alamat <span className="text-green-600">Kami</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mx-auto max-w-xl text-gray-600"
                    >
                        Temukan lokasi Pondok Pesantren Al-Mazaya Paser dan buka navigasi langsung di Google Maps.
                    </motion.p>
                </div>

                {/* Content */}
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Address Card */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="rounded-2xl bg-gray-50 p-8 shadow-md transition hover:shadow-lg">
                            <div className="mb-4 flex items-center gap-3">
                                <MapPin className="h-6 w-6 text-green-600" />
                                <h3 className="text-2xl font-semibold text-gray-800">Alamat Lengkap</h3>
                            </div>
                            <p className="mb-6 leading-relaxed text-gray-700">
                                Pondok Pesantren Al-Mazaya Paser
                                <br />
                                Sempulang, Kecamatan Tanah Grogot
                                <br />
                                Kabupaten Paser, Kalimantan Timur
                            </p>
                            <a
                                href="https://www.google.com/maps/dir//45Q2%2BH5M+Pondok+Pesantren+Al+Mazaya+Paser,+Sempulang,+Kec.+Tanah+Grogot,+Kabupaten+Paser,+Kalimantan+Timur/@-1.8610365,116.1504104,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2df047bf07ccd1d5:0x52b859ed2883afba!2m2!1d116.1504104!2d-1.8610365?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-green-700"
                            >
                                <Navigation className="h-5 w-5" />
                                Petunjuk Arah
                            </a>
                        </div>
                    </motion.div>

                    {/* Google Maps */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full overflow-hidden rounded-2xl shadow-lg"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.713829912204!2d116.14783547588466!3d-1.8610311365262817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df047bf07ccd1d5%3A0x52b859ed2883afba!2sPondok%20Pesantren%20Al%20Mazaya%20Paser!5e0!3m2!1sid!2sid!4v1756896134133!5m2!1sid!2sid"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-[400px] w-full rounded-2xl shadow-md"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
