"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface MoodFormProps {
  onSuccess?: () => void;
}
export default function MoodForm(props: MoodFormProps) {
  const [moodScore, setMoodScore] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const emotions = [
    { value: 0, label: "😔", description: "Muito Baixo" },
    { value: 25, label: "😕", description: "Baixo" },
    { value: 50, label: "😊", description: "Neutro" },
    { value: 75, label: "😃", description: "Bom" },
    { value: 100, label: "🤗", description: "Ótimo" },
  ];

  const currentEmotion =
    emotions.find((em) => Math.abs(moodScore - em.value) < 15) || emotions[2];

  return (
    <div className="space-y-6 py-4">
      <div className="text-center space-y-2">
        <div className="text-4xl">{currentEmotion.label}</div>
        <div className="text-sm text-muted-foreground">
          {currentEmotion.description}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between px-2">
          {emotions.map((em) => (
            <div
              key={em.value}
              className={`cursor-pointer transition-opacity ${
                Math.abs(moodScore - em.value) < 15
                  ? "opacity-100"
                  : "opacity-50"
              }`}
              onClick={() => setMoodScore(em.value)}
            >
              <div className="text-2xl">{em.label}</div>
            </div>
          ))}
        </div>

        <Slider
          value={[moodScore]}
          onValueChange={(value) => setMoodScore(value[0])}
          min={0}
          max={100}
          step={1}
          className="py-4"
        />
      </div>

      {/* <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={isLoading || loading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : loading ? (
          "Carregando..."
        ) : (
          "Salvar Humor"
        )}
      </Button> */}
    </div>
  );
}
