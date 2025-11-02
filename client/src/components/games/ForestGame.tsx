"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  TreePine,
  Volume2,
  VolumeX,
  Play,
  Pause,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const MEDITATION_DURATION = 5 * 60;

const AUDIO_SOURCES = {
  birds: "https://assets.mixkit.co/active_storage/sfx/2472/2472-preview.mp3", 
  wind: "https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3", 
};

export function ForestGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MEDITATION_DURATION);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const audioRefs = useRef<{
    birds: HTMLAudioElement | null;
    wind: HTMLAudioElement | null;
    leaves: HTMLAudioElement | null;
  }>({
    birds: null,
    wind: null,
    leaves: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAudio = async () => {
      try {
        const tryLocal = async (name: keyof typeof AUDIO_SOURCES) => {
          const audio = new Audio(`/sounds/${name}.mp3`);

          return new Promise<HTMLAudioElement>((resolve, reject) => {
            const timeout = setTimeout(() => {
              console.warn(
                `Timeout ao carregar /sounds/${name}.mp3, usando fallback`
              );
              const fallback = new Audio(AUDIO_SOURCES[name]);
              fallback.loop = true;
              fallback.volume = volume / 100;
              resolve(fallback);
            }, 3000);

            audio.addEventListener("canplaythrough", () => {
              clearTimeout(timeout);
              console.log(`✓ Áudio local carregado: ${name}.mp3`);
              audio.loop = true;
              audio.volume = volume / 100;
              resolve(audio);
            });

            audio.addEventListener("error", () => {
              clearTimeout(timeout);
              console.warn(
                `✗ Erro ao carregar /sounds/${name}.mp3, usando fallback`
              );
              const fallback = new Audio(AUDIO_SOURCES[name]);
              fallback.loop = true;
              fallback.volume = volume / 100;
              resolve(fallback);
            });

            audio.load();
          });
        };

        audioRefs.current.birds = await tryLocal("birds");
        audioRefs.current.wind = await tryLocal("wind");

        setAudioLoaded(true);
        console.log("✓ Todos os áudios carregados com sucesso!");
      } catch (error) {
        console.error("Erro ao carregar áudios:", error);
        setAudioError("Erro ao carregar os sons da floresta");
      }
    };

    loadAudio();

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          audio.src = "";
        }
      });
    };
  }, [volume]);

  useEffect(() => {
    if (!audioLoaded) return;

    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = volume / 100;
      }
    });
  }, [volume, audioLoaded]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(
            ((MEDITATION_DURATION - newTime) / MEDITATION_DURATION) * 100
          );
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const togglePlay = async () => {
    if (!audioLoaded) {
      setAudioError("Aguarde o carregamento dos áudios...");
      return;
    }

    const audios = Object.values(audioRefs.current).filter(
      (audio): audio is HTMLAudioElement => audio !== null
    );

    if (isPlaying) {
      audios.forEach((audio) => audio.pause());
      setIsPlaying(false);
    } else {
      try {
        await Promise.all(
          audios.map((audio) =>
            audio.play().catch((err) => {
              console.error("Erro ao tocar áudio:", err);
            })
          )
        );
        setIsPlaying(true);
        setAudioError(null);
      } catch (error) {
        console.error("Erro ao iniciar reprodução:", error);
        setAudioError("Erro ao iniciar reprodução. Tente novamente.");
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
          Carregando sons da floresta...
        </div>
      )}

      {audioError && (
        <div className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950 px-4 py-2 rounded flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {audioError}
        </div>
      )}

      <div className="relative w-48 h-48">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-linear-to-b from-green-500/20 to-transparent rounded-full blur-xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <TreePine className="w-24 h-24 text-green-600" />
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
            title={isPlaying ? "Pausar meditação" : "Iniciar meditação"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm text-muted-foreground" title="Duração total">
            {formatTime(MEDITATION_DURATION)}
          </span>
        </div>
      </div>

      {audioLoaded && (
        <p className="text-xs text-muted-foreground">
          Sons da floresta carregados ✓
        </p>
      )}
    </div>
  );
}
