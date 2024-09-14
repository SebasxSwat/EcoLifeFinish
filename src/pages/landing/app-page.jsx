'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Recycle, Droplet, Users, TreeDeciduous, Zap } from 'lucide-react'
import {Link }from 'react-router-dom'

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-800">EcoLife</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#features"
                className="text-green-700 hover:text-green-500 transition"
              >
                Características
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-green-700 hover:text-green-500 transition"
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-green-700 hover:text-green-500 transition"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-green-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Vive una vida más verde con EcoLife
          </motion.h1>
          <motion.p
            className="text-xl text-green-600 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Únete a nuestra comunidad y haz una diferencia para el planeta
          </motion.p>
          <Link to="/login">
          <motion.button
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comienza Ahora
          </motion.button>
          </Link>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard
                icon={<Users className="h-10 w-10 text-blue-500" />}
                number="Unete a Nosotros"
                text=""
              />
              <StatCard
                icon={<TreeDeciduous className="h-10 w-10 text-green-500" />}
                number="Planta Arboles"
                text=""
              />
              <StatCard
                icon={<Zap className="h-10 w-10 text-yellow-500" />}
                number="Ahorra Energia"
                text=""
              />
            </div>
          </div>
        </section>

        <section className="bg-green-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
              Cómo funciona EcoLife
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Regístrate"
                description="Crea tu cuenta gratuita y únete a la comunidad EcoLife."
              />
              <StepCard
                number="2"
                title="Completa Desafíos"
                description="Participa en retos ecológicos diarios y semanales."
              />
              <StepCard
                number="3"
                title="Gana Recompensas"
                description="Acumula puntos y desbloquea insignias por tus logros verdes."
              />
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
              Características de EcoLife
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Leaf className="h-12 w-12 text-green-600" />}
                title="Retos Ecológicos"
                description="Participa en desafíos diarios y semanales para reducir tu huella de carbono."
              />
              <FeatureCard
                icon={<Recycle className="h-12 w-12 text-blue-600" />}
                title="Seguimiento de Reciclaje"
                description="Registra y visualiza tu impacto positivo a través del reciclaje."
              />
              <FeatureCard
                icon={<Droplet className="h-12 w-12 text-cyan-600" />}
                title="Ahorro de Agua"
                description="Aprende técnicas para conservar agua y reduce tu consumo."
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
              Sobre EcoLife
            </h2>
            <p className="text-lg text-center text-green-700 max-w-3xl mx-auto">
              EcoLife es una plataforma dedicada a hacer del mundo un lugar más
              verde y sostenible. Nuestra misión es empoderar a las personas
              para que tomen decisiones ecológicas en su vida diaria, creando un
              impacto positivo en el medio ambiente.
            </p>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-8">
              Únete a la Revolución Verde
            </h2>
            <p className="text-lg text-green-700 mb-8">
              ¿Listo para hacer una diferencia? Regístrate ahora y comienza tu
              viaje hacia un estilo de vida más sostenible.
            </p>
            <Link to="/register">
            <motion.button
              className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Regístrate Gratis <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">EcoLife</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-green-300 transition">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition">
                    Términos de Servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition">
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-green-300">
            © 2024 EcoLife. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-green-50 p-6 rounded-lg shadow-md"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">
      {title}
    </h3>
    <p className="text-green-600 text-center">{description}</p>
  </motion.div>
);

const StatCard = ({ icon, number, text }) => (
  <motion.div
    className="bg-green-50 p-6 rounded-lg shadow-md text-center"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-3xl font-bold text-green-800 mb-2">{number}</h3>
    <p className="text-green-600">{text}</p>
  </motion.div>
);

const StepCard = ({ number, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-center mb-4">
      <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">
      {title}
    </h3>
    <p className="text-green-600 text-center">{description}</p>
  </motion.div>
);

export default LandingPage;
