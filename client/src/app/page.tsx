"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";

export default function EnhancedLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [emotion, setEmotion] = useState(50);
  const [showDialog, setShowDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const emotions = [
    { value: 0, label: "😔 Triste", color: "from-blue-500/50" },
    { value: 25, label: "😊 Contente", color: "from-green-500/50" },
    { value: 50, label: "😌 Tranquilo", color: "from-purple-500/50" },
    { value: 75, label: "🤗 Feliz", color: "from-yellow-500/50" },
    { value: 100, label: "🤩 Animado", color: "from-pink-500/50" },
  ];

  const welcomeSteps = [
    {
      title: "Oi, eu sou a Serena 👋",
      description:
        "Sua companheira de IA para bem-estar emocional. Estou aqui para fornecer um espaço seguro e livre de julgamentos para você se expressar.",
      icon: "🌊",
    },
    {
      title: "Suporte Personalizado 🌱",
      description:
        "Me adapto às suas necessidades e estado emocional, oferecendo técnicas baseadas em evidências e orientação gentil quando você mais precisar.",
      icon: "🧠",
    },
    {
      title: "Sua Privacidade Importa 🛡️",
      description:
        "Nossas conversas são completamente privadas e seguras. Sigo diretrizes éticas rigorosas e respeito seus limites.",
      icon: "🔒",
    },
  ];

  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  const features = [
    {
      title: "Suporte 24/7",
      description:
        "Sempre aqui para ouvir e apoiar você, a qualquer hora do dia",
      emoji: "❤️",
      color: "from-rose-500/20",
      delay: 0.2,
    },
    {
      title: "Insights Inteligentes",
      description:
        "Orientação personalizada impulsionada por inteligência emocional",
      emoji: "💡",
      color: "from-amber-500/20",
      delay: 0.4,
    },
    {
      title: "Privado e Seguro",
      description: "Suas conversas são sempre confidenciais e criptografadas",
      emoji: "🔒",
      color: "from-emerald-500/20",
      delay: 0.6,
    },
    {
      title: "Baseado em Evidências",
      description: "Técnicas terapêuticas apoiadas por pesquisas clínicas",
      emoji: "💬",
      color: "from-blue-500/20",
      delay: 0.8,
    },
  ];

  const stats = [
    { emoji: "👥", value: "10K+", label: "Usuários Ativos" },
    { emoji: "💬", value: "50K+", label: "Conversas Realizadas" },
    { emoji: "⭐", value: "4.9/5", label: "Avaliação Média" },
    { emoji: "📈", value: "95%", label: "Taxa de Satisfação" },
  ];

  const benefits = [
    {
      emoji: "📅",
      title: "Rastreamento de Humor",
      description:
        "Monitore suas emoções ao longo do tempo com visualizações intuitivas",
      linear: "from-purple-500 to-pink-500",
    },
    {
      emoji: "🧠",
      title: "IA Avançada (Google Gemini)",
      description:
        "Conversas naturais com tecnologia de ponta em processamento de linguagem",
      linear: "from-blue-500 to-cyan-500",
    },
    {
      emoji: "⚡",
      title: "Resposta Instantânea",
      description: "Obtenha apoio imediato quando você mais precisar",
      linear: "from-orange-500 to-red-500",
    },
    {
      emoji: "📊",
      title: "Dashboard Personalizado",
      description: "Visualize seu progresso e identifique padrões emocionais",
      linear: "from-green-500 to-emerald-500",
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Estudante Universitária",
      content:
        "O Equilibrium mudou minha vida. Ter alguém disponível 24/7 para conversar fez toda a diferença nos meus momentos de ansiedade.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Profissional de TI",
      content:
        "A Serena me ajudou a desenvolver hábitos saudáveis e a entender melhor meus padrões emocionais. Recomendo muito!",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Empreendedora",
      content:
        "Incrível como a IA consegue ser tão empática. Me sinto compreendida e apoiada em cada conversa.",
      rating: 5,
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Cadastre-se",
      description: "Crie sua conta gratuitamente em menos de 1 minuto",
      emoji: "✨",
    },
    {
      step: "02",
      title: "Converse com Serena",
      description:
        "Compartilhe seus pensamentos e sentimentos em um espaço seguro",
      emoji: "💭",
    },
    {
      step: "03",
      title: "Acompanhe seu Progresso",
      description:
        "Visualize sua jornada emocional com insights personalizados",
      emoji: "🌱",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute size-[500px] rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out bg-linear-to-r ${currentEmotion?.color} to-transparent opacity-60`}
          />
          <div className="absolute size-[400px] rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
        </div>

        <div className="pointer-events-none absolute inset-0 select-none opacity-60">
          {Array.from({ length: 8 }, (_, i) => {
            const size = 210 + i * 70;
            const opacity = 0.24 - i * 0.03;
            return (
              <div
                key={i}
                className="animate-ripple bg-foreground/25 absolute rounded-full border shadow-xl"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  animationDelay: `${i * 0.06}s`,
                  borderWidth: "1px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(1)",
                }}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative space-y-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <Waves className="size-4 animate-wave text-primary" />
            <span className="relative text-foreground/90 dark:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Seu Terapeuta Pessoal com IA
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="inline-block bg-linear-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:0_1px_0_rgb(0_0_0/20%)] transition-all duration-300">
              Encontre Paz
            </span>
            <br />
            <span className="inline-block mt-2 bg-linear-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              na Mente
            </span>
          </h1>

          <p className="max-w-[600px] mx-auto text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
            Experimente uma nova forma de apoio emocional. Nossa companheira de
            IA, <strong>Serena</strong>, está aqui para ouvir, compreender e
            guiá-lo na jornada da vida.
          </p>

          <motion.div
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground/80 font-medium">
                O que estiver sentindo, estamos aqui para ouvir
              </p>

              <div className="flex items-center justify-between px-2">
                {emotions.map((em) => (
                  <div
                    key={em.value}
                    className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                      Math.abs(emotion - em.value) < 15
                        ? "opacity-100 scale-110 transform-gpu"
                        : "opacity-50 scale-100"
                    }`}
                    onClick={() => setEmotion(em.value)}
                  >
                    <div className="text-2xl transform-gpu">
                      {em.label.split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-medium">
                      {em.label.split(" ")[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative px-2">
              <div
                className={`absolute inset-0 bg-linear-to-r ${currentEmotion?.color} to-transparent blur-2xl -z-10 transition-all duration-500`}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={emotion}
                onChange={(e) => setEmotion(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground animate-pulse">
                Deslize para expressar como você está se sentindo hoje
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <button
              onClick={() => setShowDialog(true)}
              className="relative group h-12 px-8 rounded-full bg-linear-to-r from-primary via-primary/90 to-secondary shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10 font-medium flex items-center gap-2 text-primary-foreground">
                Comece sua Jornada
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-4xl mb-4 transition-transform"
                >
                  {stat.emoji}
                </motion.div>
                <div className="text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold bg-linear-to-r from-primary/90 to-primary bg-clip-text text-transparent dark:text-primary/90">
              Como a Serena te Ajuda
            </h2>
            <p className="text-foreground dark:text-foreground/95 max-w-2xl mx-auto font-medium text-lg">
              Experimente um novo tipo de suporte emocional, impulsionado por IA
              empática
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="group relative overflow-hidden border border-primary/10 hover:border-primary/20 transition-all duration-300 h-[200px] bg-card/30 dark:bg-card/80 backdrop-blur-sm rounded-2xl p-6">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 dark:group-hover:opacity-30`}
                  />
                  <div className="relative">
                    <div className="text-4xl mb-3">{feature.emoji}</div>
                    <h3 className="font-semibold tracking-tight text-foreground/90 dark:text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/90 dark:text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/20 dark:via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Recursos Poderosos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para cuidar da sua saúde mental
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative p-8 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 size-32 bg-linear-to-br ${benefit.linear} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity rounded-full`}
                />
                <div className="relative">
                  <div className="text-5xl mb-4">{benefit.emoji}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Como Funciona</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Três passos simples para começar sua jornada de bem-estar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-linear-to-br from-primary to-secondary text-primary-foreground font-bold text-xl mb-6 shadow-lg">
                  {item.step}
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-primary/50 to-transparent" />
                )}
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              O que Dizem Nossos Usuários
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas que transformaram suas vidas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative p-8 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm"
              >
                <div className="text-4xl mb-4 opacity-30">💬</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-primary text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="border-t border-primary/10 pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8 relative"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl -z-10" />
          <div className="relative p-12 rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="text-5xl mb-6">✨</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão cuidando da sua saúde
              mental com a ajuda da Serena. É gratuito e leva apenas 1 minuto.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Criar Conta Gratuita
              <span>→</span>
            </motion.button>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg">✓</span>
                Sem cartão de crédito
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg">✓</span>
                100% Gratuito
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg">✓</span>
                Privado e Seguro
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDialog(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-card/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-primary/20 shadow-2xl"
          >
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                {welcomeSteps[currentStep].icon}
              </div>
              <h3 className="text-2xl text-center font-bold">
                {welcomeSteps[currentStep].title}
              </h3>
              <p className="text-center text-base leading-relaxed text-muted-foreground">
                {welcomeSteps[currentStep].description}
              </p>
            </motion.div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex gap-2">
                {welcomeSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep ? "bg-primary w-4" : "bg-primary/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  if (currentStep < welcomeSteps.length - 1) {
                    setCurrentStep((c) => c + 1);
                  } else {
                    setShowDialog(false);
                    setCurrentStep(0);
                  }
                }}
                className="px-6 py-2 rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground font-medium hover:shadow-lg transition-all"
              >
                {currentStep === welcomeSteps.length - 1 ? (
                  <span className="flex items-center gap-2">
                    Vamos Começar ✨
                  </span>
                ) : (
                  <span className="flex items-center gap-2">Próximo →</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
