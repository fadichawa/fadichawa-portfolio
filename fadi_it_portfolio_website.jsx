import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Briefcase,
  Server,
  Network,
  Mail,
  Cpu,
  ShieldCheck,
  MonitorSmartphone,
  Palette,
  Linkedin,
  MessageCircle,
  Building2,
  Globe,
  Layers3,
  Shield,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function ParticleNetwork() {
  const particles = useMemo(
    () => [
      { x: "8%", y: "16%", size: 7 },
      { x: "20%", y: "40%", size: 8 },
      { x: "30%", y: "24%", size: 6 },
      { x: "40%", y: "54%", size: 7 },
      { x: "52%", y: "16%", size: 6 },
      { x: "62%", y: "36%", size: 8 },
      { x: "72%", y: "24%", size: 7 },
      { x: "82%", y: "46%", size: 8 },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={`particle-${index}`}
          animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -12, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full bg-sky-400/60 shadow-[0_0_18px_rgba(56,189,248,0.35)]"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}

function ClientLogo({
  name,
  logo,
  broken,
  onBroken,
}: {
  name: string;
  logo?: string;
  broken: boolean;
  onBroken: () => void;
}) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  if (!logo || broken) {
    return (
      <div className="flex h-14 w-full items-center justify-center rounded-xl bg-slate-50 text-sm font-bold tracking-[0.25em] text-slate-500 transition duration-300 group-hover:bg-sky-50 group-hover:text-sky-700">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={`${name} logo`}
      className="max-h-14 w-auto object-contain grayscale opacity-70 transition duration-300 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
      loading="lazy"
      onError={onBroken}
    />
  );
}

export default function PortfolioWebsite() {
  const services = [
    {
      title: "IT Management & Consulting",
      desc: "Strategic IT support and planning for companies.",
      icon: Briefcase,
    },
    {
      title: "Server & Infrastructure",
      desc: "Windows, Linux, hosting and on-prem systems support.",
      icon: Server,
    },
    {
      title: "Network Administration",
      desc: "Network configuration, troubleshooting and monitoring.",
      icon: Network,
    },
    {
      title: "Email & Domain Solutions",
      desc: "SMTP, DNS, Postfix and deliverability management.",
      icon: Mail,
    },
    {
      title: "Virtualization",
      desc: "VMware environments and system migrations.",
      icon: Cpu,
    },
    {
      title: "Website Development",
      desc: "Modern responsive websites and business landing pages.",
      icon: MonitorSmartphone,
    },
    {
      title: "Logo & Brand Design",
      desc: "Professional logo and company branding creation.",
      icon: Palette,
    },
    {
      title: "Remote IT Support",
      desc: "Reliable remote IT management for companies.",
      icon: ShieldCheck,
    },
  ];

  const projects = [
    {
      title: "Corporate IT Infrastructure Support",
      category: "Infrastructure",
      description:
        "Ongoing support for business infrastructure including servers, networking, email systems, and operational troubleshooting.",
      icon: Server,
      tags: ["Servers", "Networking", "Email", "Operations"],
    },
    {
      title: "Business Website Development",
      category: "Web Development",
      description:
        "Designed and built modern responsive websites for companies that need a professional online presence and better customer trust.",
      icon: Globe,
      tags: ["Responsive Design", "Landing Pages", "Business Websites"],
    },
    {
      title: "Brand Identity & Logo Design",
      category: "Branding",
      description:
        "Created visual identity concepts and logos for businesses looking to present a stronger and more recognizable brand.",
      icon: Layers3,
      tags: ["Logo Design", "Brand Identity", "Visual Direction"],
    },
    {
      title: "Security & Service Continuity",
      category: "Security",
      description:
        "Helped businesses improve service reliability, access control awareness, and operational continuity across critical systems.",
      icon: Shield,
      tags: ["Continuity", "Risk Awareness", "System Reliability"],
    },
  ];

  const clients = [
    {
      name: "Jaccob Services",
      url: "https://www.jaccobservices.com",
      work: "Website + Logo Design",
      logo: "/mnt/data/front.png",
    },
    {
      name: "MGE LLC",
      url: "https://www.mgellc.org",
      work: "Website + Logo Design",
      logo: "/mnt/data/ENG MGE LLC.jpg",
    },
    {
      name: "Zmeralda",
      url: "https://www.zmeralda.com",
      work: "Website + Logo Design",
      logo: "/mnt/data/zmeralda gold and bronze.bmp",
    },
    {
      name: "Beirut-IT",
      url: "https://www.beirut-it.com",
      work: "Website + Logo Design",
      logo: "/mnt/data/Final logo.bmp",
    },
  ];

  const marqueeClients = [...clients, ...clients];

  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({});

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const orbX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const orbY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-sky-50 to-blue-100 text-slate-800">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute left-[-80px] top-[-80px] h-[420px] w-[420px] rounded-full bg-sky-300/40 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.06)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <section className="relative border-b border-sky-100">
        <ParticleNetwork />
        <div className="mx-auto max-w-7xl px-6 py-24">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="mb-4 font-medium text-sky-600">
              IT Manager • Websites • Branding • Consulting
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-5xl font-bold leading-tight text-slate-900">
              Modern IT consulting and
              <span className="text-sky-600"> digital services</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-600">
              Helping businesses build reliable IT infrastructure, modern websites, and professional digital identity.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#services"
                className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-sky-500"
              >
                Explore Services
              </a>
              <a
                href="#portfolio"
                className="rounded-xl border border-sky-300 px-6 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-sky-300 px-6 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
              >
                Contact
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Services</h2>
          <p className="mt-2 text-slate-600">IT, website and branding services for businesses.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-7xl px-6 pb-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Projects & Portfolio</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            A snapshot of the type of work I deliver across IT infrastructure, web development, branding, and business technology support.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <Icon size={20} />
                  </div>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                    {project.category}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sky-100 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="clients" className="mx-auto max-w-7xl px-6 py-12">
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm">
          <div className="border-b border-sky-100 bg-gradient-to-r from-white via-sky-50 to-white px-8 py-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              <Building2 size={16} />
              Trusted by businesses
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Clients & Company Types</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              A cleaner logo wall inspired by modern SaaS portfolios, designed to highlight the brands and business types I support.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

            <motion.div
              animate={{ x: [0, -520] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 p-8 w-max"
            >
              {marqueeClients.map((client, index) => (
                <motion.a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group flex min-h-[176px] w-[260px] shrink-0 flex-col items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-6 text-center shadow-[0_10px_30px_rgba(2,132,199,0.06)] transition hover:border-sky-200 hover:shadow-[0_18px_40px_rgba(2,132,199,0.12)]"
                >
                  <div className="flex h-20 w-full items-center justify-center rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-3 transition group-hover:border-sky-100 group-hover:from-sky-50 group-hover:to-white">
                    <ClientLogo
                      name={client.name}
                      logo={client.logo}
                      broken={Boolean(brokenLogos[client.name])}
                      onBroken={() =>
                        setBrokenLogos((prev) => ({
                          ...prev,
                          [client.name]: true,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <div className="font-semibold tracking-[0.08em] text-slate-800 transition group-hover:text-sky-700">
                      {client.name}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {client.work}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-2xl border border-sky-100 bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">Contact</h2>
          <p className="mt-2 text-slate-600">
            Available for IT consulting, website development and branding work.
          </p>

          <div className="mt-6 space-y-1 text-sm text-slate-600">
            <p><strong>Name:</strong> Fadi</p>
            <p><strong>Email:</strong> info@fadichawa.com</p>
            <p><strong>Website:</strong> www.fadichawa.com</p>
            <p><strong>Location:</strong> Beirut, Lebanon</p>
          </div>

          <form action="mailto:info@fadichawa.com" method="post" encType="text/plain" className="mt-8 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full rounded-xl border border-sky-200 px-4 py-3 outline-none transition focus:border-sky-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-sky-200 px-4 py-3 outline-none transition focus:border-sky-400"
            />
            <textarea
              name="message"
              placeholder="Describe the IT service or website you need"
              rows={4}
              className="w-full rounded-xl border border-sky-200 px-4 py-3 outline-none transition focus:border-sky-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-500"
            >
              Send Inquiry
            </button>
          </form>

          <a
            href="https://linkedin.com/in/fadichawa"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-600"
          >
            <Linkedin size={18} /> Connect on LinkedIn
          </a>
        </div>
      </section>

      <a
        href="https://wa.me/96171340215?text=Hello%20Fadi%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-white shadow-lg"
      >
        <MessageCircle size={18} /> WhatsApp
      </a>

      <footer className="border-t border-sky-100 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Fadi Chawa • www.fadichawa.com
      </footer>
    </div>
  );
}
