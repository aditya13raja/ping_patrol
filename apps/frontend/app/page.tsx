"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="bg-[#0f172a] text-gray-100 min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20" />
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
                        >
                            Better Stack Monitoring
                        </motion.h1>
                        <p className="mt-12 text-lg text-gray-300 max-w-xl">
                            Full visibility into your infrastructure, APIs, and logs — all in
                            one beautiful dark-mode dashboard.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <button className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center">
                                Start Monitoring <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                            <button className="px-6 py-3 rounded-2xl border border-gray-600 text-gray-300 hover:bg-gray-800 font-semibold">
                                Live Demo
                            </button>
                        </div>
                    </div>
                    {/* Right image */}
                    <div className="hidden md:block">
                        <img
                            src="https://imagedelivery.net/xZXo0QFi-1_4Zimer-T0XQ/ab381410-7fed-4471-6705-9e98971ec800/orig" // Replace with your image path
                            alt="Monitoring Dashboard"
                            className="rounded-2xl border border-gray-800 shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold text-white">Pricing</h2>
                    <p className="mt-4 text-gray-400">
                        Simple, transparent pricing. No hidden fees.
                    </p>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Starter",
                            price: "$29",
                            features: [
                                "10 monitors",
                                "1-minute checks",
                                "Email notifications",
                                "5 team members",
                                "24h data retention",
                            ],
                        },
                        {
                            name: "Professional",
                            price: "$79",
                            features: [
                                "50 monitors",
                                "30-second checks",
                                "All notification channels",
                                "Unlimited team members",
                                "30-day data retention",
                                "API access",
                            ],
                            highlight: true,
                        },
                        {
                            name: "Enterprise",
                            price: "$199",
                            features: [
                                "Unlimited monitors",
                                "15-second checks",
                                "Priority support",
                                "Custom solutions",
                                "90-day data retention",
                                "SLA guarantee",
                            ],
                        },
                    ].map((plan, i) => (
                            <div
                                key={i}
                                className={`rounded-2xl p-8 shadow-lg flex flex-col transition-transform ${
plan.highlight
? "bg-blue-600 text-white scale-105"
: "bg-gray-900 border border-gray-700 hover:border-gray-600"
}`}
                            >
                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                <p className="text-4xl font-bold mt-4">
                                    {plan.price}
                                    <span className="text-lg font-normal">/month</span>
                                </p>
                                <ul className="mt-6 space-y-2 flex-1">
                                    {plan.features.map((f, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <CheckCircle2
                                                className={`h-5 w-5 ${
plan.highlight ? "text-white" : "text-green-500"
}`}
                                            />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`mt-8 px-6 py-3 rounded-2xl font-semibold ${
plan.highlight
? "bg-white text-blue-600 hover:bg-gray-100"
: "bg-blue-600 hover:bg-blue-500 text-white"
}`}
                                >
                                    Get Started
                                </button>
                            </div>
                        ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0d1324] border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-12 text-gray-400">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-white">Better Stack Monitoring</h3>
                        <p className="mt-4 text-sm">
                            Full visibility into your infrastructure, APIs, and logs — all in one place.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Product</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Features</a></li>
                            <li><a href="#" className="hover:text-white">Pricing</a></li>
                            <li><a href="#" className="hover:text-white">Integrations</a></li>
                            <li><a href="#" className="hover:text-white">Status</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Company</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">About</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Legal</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Security</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8">
                    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} Better Stack Monitoring. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white">GitHub</a>
                            <a href="#" className="hover:text-white">Twitter</a>
                            <a href="#" className="hover:text-white">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

