"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const TOTAL_ROUNDS = 5;

const PHASE_DURATIONS = {
  inhale: 4,
  hold: 7,
  exhale: 8,
};

type Phase = "inhale" | "hold" | "exhale";

export function BreathingGame() {
  const [phase, setPhase] = useState<Phase>("inhale");
  const [progress, setProgress] = useState(0);
  const [round, setRound] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isComplete || isPaused) return;

    const duration = PHASE_DURATIONS[phase] * 1000;
    startTimeRef.current = Date.now();
    const updateInterval = 50;

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        goToNextPhase();
      }
    };

    updateProgress();

    timerRef.current = setInterval(updateProgress, updateInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, isComplete, isPaused]);

  const goToNextPhase = () => {
    setProgress(0);

    if (phase === "inhale") {
      setPhase("hold");
    } else if (phase === "hold") {
      setPhase("exhale");
    } else if (phase === "exhale") {
      if (round >= TOTAL_ROUNDS) {
        setIsComplete(true);
      } else {
        setRound(round + 1);
        setPhase("inhale");
      }
    }
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPhase("inhale");
    setProgress(0);
    setRound(1);
    setIsComplete(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-semibold">Ótimo trabalho!</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Você completou {TOTAL_ROUNDS} rodadas de respiração 4-7-8. Como você
          se sente?
        </p>
        <Button onClick={handleReset} className="mt-4">
          Começar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              key={`${phase}-${round}`}
              initial={{
                scale: phase === "inhale" ? 0.7 : phase === "hold" ? 1.3 : 1.3,
              }}
              animate={{
                scale: phase === "inhale" ? 1.3 : phase === "hold" ? 1.3 : 0.7,
              }}
              transition={{
                duration: PHASE_DURATIONS[phase],
                ease: phase === "hold" ? "linear" : "easeInOut",
              }}
              className="absolute inset-0 bg-primary/10 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Wind className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold">
            {phase === "inhale"
              ? "Inspire (4s)"
              : phase === "hold"
              ? "Segure (7s)"
              : "Expire (8s)"}
          </h3>
        </motion.div>
      </AnimatePresence>

      <div className="w-64">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-2 text-center">
        <div className="text-sm text-muted-foreground">
          Rodada {round} de {TOTAL_ROUNDS}
        </div>
        <Button variant="ghost" size="sm" onClick={handlePause}>
          {isPaused ? "Retomar" : "Pausar"}
        </Button>
      </div>
    </div>
  );
}
