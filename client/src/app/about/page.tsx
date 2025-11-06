"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, Target, Sparkles } from "lucide-react";

const missions = [
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Nossa Missão",
    description:
      "Democratizar o acesso ao apoio em saúde mental por meio de IA ética e tecnologia blockchain, tornando o cuidado terapêutico de qualidade acessível a todos, em qualquer lugar e a qualquer momento.",
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Nossa Visão",
    description:
      "Um mundo onde o apoio à saúde mental seja acessível, privado e personalizado, impulsionado por agentes de IA confiáveis e protegido pela tecnologia blockchain.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Nossos Valores",
    description:
      "Privacidade, Inovação, Empatia e Confiança são os pilares da nossa plataforma, garantindo os mais altos padrões de cuidado e segurança.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Sobre o Equilibrium
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Estamos revolucionando o apoio à saúde mental ao combinar tecnologia
          de IA de ponta com a segurança e transparência da blockchain.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 text-center h-full bg-card/50 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="mb-4 flex justify-center">{mission.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{mission.title}</h3>
              <p className="text-muted-foreground">{mission.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
