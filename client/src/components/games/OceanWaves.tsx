"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Waves, Volume2, VolumeX, Play, Pause, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const BREATH_DURATION = 8;
const SESSION_DURATION = 5 * 60;

// Áudio de ondas do oceano online (substitua pelo seu quando resolver)
const OCEAN_AUDIO_URL = "https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3";

export function OceanWaves() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const waveControls = useAnimation();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAudio = async () => {
      try {
        // Tenta carregar áudio local primeiro
        const audio = new Audio("/sounds/waves.mp3");
        
        const loadPromise = new Promise<HTMLAudioElement>((resolve, reject) => {
          const timeout = setTimeout(() => {
            console.warn("Timeout ao carregar /sounds/waves.mp3, usando fallback");
            const fallback = new Audio(OCEAN_AUDIO_URL);
            fallback.loop = true;
            fallback.volume = volume / 100;
            resolve(fallback);
          }, 3000);

          audio.addEventListener("canplaythrough", () => {
            clearTimeout(timeout);
            console.log("✓ Áudio local carregado: waves.mp3");
            audio.loop = true;
            audio.volume = volume / 100;
            resolve(audio);
          });

          audio.addEventListener("error", () => {
            clearTimeout(timeout);
            console.warn("✗ Erro ao carregar /sounds/waves.mp3, usando fallback");
            const fallback = new Audio(OCEAN_AUDIO_URL);
            fallback.loop = true;
            fallback.volume = volume / 100;
            resolve(fallback);
          });

          audio.load();
        });

        audioRef.current = await loadPromise;
        setAudioLoaded(true);
        console.log("✓ Áudio do oceano carregado com sucesso!");
      } catch (error) {
        console.error("Erro ao carregar áudio:", error);
        setAudioError("Erro ao carregar som do oceano");
      }
    };

    loadAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && audioLoaded) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioLoaded]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(((SESSION_DURATION - newTime) / SESSION_DURATION) * 100);
          return newTime;
        });
      }, 1000);

      waveControls.start({
        y: [0, -20, 0],
        transition: {
          duration: BREATH_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      waveControls.stop();
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, waveControls]);

  const togglePlay = async () => {
    if (!audioRef.current || !audioLoaded) {
      setAudioError("Aguarde o carregamento do áudio...");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setAudioError(null);
      } catch (error) {
        console.error("Erro ao tocar áudio:", error);
        setAudioError("Erro ao reproduzir áudio. Tente novamente.");
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      {!audioLoaded && (
        <div className="text-sm text-blue-500 bg-blue-50 dark:bg-blue-950 px-4 py-2 rounded flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
          Carregando som do oceano...
        </div>
      )}

      {audioError && (
        <div className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950 px-4 py-2 rounded flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {audioError}
        </div>
      )}

      <div className="relative w-48 h-48">
        <div className="absolute inset-0 bg-linear-to-b from-blue-500/20 to-transparent rounded-full blur-xl" />
        <motion.div
          animate={waveControls}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <Waves className="w-24 h-24 text-blue-600" />
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: BREATH_DURATION,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-blue-400/10 blur-xl rounded-full"
            />
          </div>
        </motion.div>
      </div>

      <div className="w-64 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Volume</span>
            <span>{volume}%</span>
          </div>
          <div className="flex items-center gap-2">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              disabled={!audioLoaded}
            />
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex items-center justify-between">
          <span
            className="text-sm text-muted-foreground"
            title="Tempo restante"
          >
            {formatTime(timeLeft)}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="rounded-full"
            disabled={!audioLoaded}
            title={isPlaying ? "Pausar som do oceano" : "Iniciar som do oceano"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <span
            className="text-sm text-muted-foreground"
            title="Duração total da sessão"
          >
            {formatTime(SESSION_DURATION)}
          </span>
        </div>
      </div>

      {audioLoaded && (
        <p className="text-xs text-muted-foreground">
          Som do oceano carregado ✓
        </p>
      )}
    </div>
  );
}