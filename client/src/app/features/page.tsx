"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Shield,
  Fingerprint,
  Activity,
  Bot,
  LineChart,
  Wifi,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: "Terapia com IA",
    description:
      "Acesso 24 horas por dia a agentes de IA empáticos, treinados em diversas abordagens terapêuticas, oferecendo suporte personalizado à sua saúde mental.",
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Segurança Blockchain",
    description:
      "Suas sessões terapêuticas são protegidas pela tecnologia blockchain, garantindo total privacidade e registros transparentes.",
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: "Análise Inteligente",
    description:
      "A detecção avançada de emoções e o processamento de linguagem natural ajudam Serena a compreender seu estado mental e oferecer intervenções adequadas.",
  },
  {
    icon: <Activity className="w-10 h-10 text-primary" />,
    title: "Detecção de Crises",
    description:
      "Monitoramento em tempo real e protocolos de emergência asseguram sua segurança em situações críticas.",
  },
  {
    icon: <Wifi className="w-10 h-10 text-primary" />,
    title: "Integração com IoT",
    description:
      "Conecte-se a dispositivos inteligentes para criar um ambiente terapêutico que se adapta às suas necessidades.",
  },
  {
    icon: <LineChart className="w-10 h-10 text-primary" />,
    title: "Acompanhamento de Progresso",
    description:
      "Análises detalhadas e insights sobre sua jornada de saúde mental, com registros de sessões verificados via blockchain.",
  },
  {
    icon: <Fingerprint className="w-10 h-10 text-primary" />,
    title: "Privacidade em Primeiro Lugar",
    description:
      "Criptografia de ponta a ponta e provas de conhecimento zero garantem que seus dados permaneçam totalmente confidenciais.",
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: "Cuidado Holístico",
    description:
      "Integração com dispositivos vestíveis e provedores de saúde para um monitoramento completo do seu bem-estar mental.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Funcionalidades da Plataforma
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubra como o Equilibrium revoluciona o apoio à saúde mental com a
          ajuda de Serena — uma IA avançada que une tecnologia de ponta e
          proteção de privacidade inabalável.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Pronto para Começar?</h2>
        <p className="text-muted-foreground mb-8">
          Junte-se a milhares de pessoas que já estão transformando sua saúde
          mental com o apoio inteligente da Serena.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Inicie Sua Jornada
          <Heart className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
}
