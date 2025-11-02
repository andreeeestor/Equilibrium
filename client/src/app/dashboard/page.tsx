"use client";

import { Container } from "@/components/Container";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  Bell,
  Brain,
  BrainCircuit,
  Heart,
  Loader2,
  MessageSquare,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  addDays,
  format,
  isWithinInterval,
  startOfDay,
  subDays,
} from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnxietyGames } from "@/components/games/AnxietyGames";
import MoodForm from "@/components/mood/MoodForm";
import { ActivityLogger } from "@/components/activities/ActivityLogger";
import { useRouter } from "next/navigation";

type ActivityLevel = "none" | "low" | "medium" | "high";

interface DayActivity {
  date: Date;
  level: ActivityLevel;
  activities: {
    type: string;
    name: string;
    completed: boolean;
    time?: string;
  }[];
}

interface Activity {
  id: string;
  userId: string | null;
  type: string;
  name: string;
  description: string | null;
  timestamp: Date;
  duration: number | null;
  completed: boolean;
  moodScore: number | null;
  moodNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface DailyStats {
  moodScore: number | null;
  completionRate: number;
  mindfulnessCount: number;
  totalActivities: number;
  lastUpdated: Date;
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [insights, setInsights] = useState<
    {
      title: string;
      description: string;
      icon: any;
      priority: "low" | "medium" | "high";
    }[]
  >([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showCheckInChat, setShowCheckInChat] = useState(false);
  const [activityHistory, setActivityHistory] = useState<DayActivity[]>([]);
  const [showActivityLogger, setShowActivityLogger] = useState(false);
  const [isSavingActivity, setIsSavingActivity] = useState(false);
  const [isSavingMood, setIsSavingMood] = useState(false);
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    moodScore: null,
    completionRate: 100,
    mindfulnessCount: 0,
    totalActivities: 0,
    lastUpdated: new Date(),
  });

  const handleMoodSubmit = async (data: { moodScore: number }) => {
    setIsSavingMood(true);
    try {
      // await saveMoodData({
      //   userId: "default-user",
      //   mood: data.moodScore,
      //   note: "",
      // });
      setShowMoodModal(false);
    } catch (error) {
      console.error("Error saving mood:", error);
    } finally {
      setIsSavingMood(false);
    }
  };

  const handleAICheckIn = () => {
    setShowActivityLogger(true);
  };

  const handleStartTherapy = () => {
    router.push("/therapy/new");
  };

  const transformActivitiesToDayActivity = (
    activities: Activity[]
  ): DayActivity[] => {
    const days: DayActivity[] = [];
    const today = new Date();

    for (let i = 27; i >= 0; i--) {
      const date = startOfDay(subDays(today, i));
      const dayActivities = activities.filter((activity) =>
        isWithinInterval(new Date(activity.timestamp), {
          start: date,
          end: addDays(date, 1),
        })
      );

      let level: ActivityLevel = "none";
      if (dayActivities.length > 0) {
        if (dayActivities.length <= 2) level = "low";
        else if (dayActivities.length <= 4) level = "medium";
        else level = "high";
      }

      days.push({
        date,
        level,
        activities: dayActivities.map((activity) => ({
          type: activity.type,
          name: activity.name,
          completed: activity.completed,
          time: format(new Date(activity.timestamp), "h:mm a"),
        })),
      });
    }

    return days;
  };

  const wellnessStats = [
    {
      title: "Pontuação do Humor",
      value: dailyStats.moodScore ? `${dailyStats.moodScore}%` : "Sem dados",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Humor médio de hoje",
    },
    {
      title: "Taxa de conclusão",
      value: "100%",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Taxa de conclusão perfeita",
    },
    {
      title: "Sessões de Terapia",
      value: `${dailyStats.mindfulnessCount} sessões`,
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      description: "Total de sessões completadas",
    },
    {
      title: "Total de atividades",
      value: dailyStats.totalActivities.toString(),
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Planejados para hoje",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <Container className="pt-20 pb-8 space-y-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Bem-Vindo de volta!
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString("pt-BR", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-primary/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary/10 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Ações Rápidas</h3>
                      <p className="text-sm text-muted-foreground">
                        Começe a sua jornada do bem-estar
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Button
                      variant="default"
                      className={cn(
                        "w-full justify-between items-center p-6 h-auto group/button",
                        "bg-linear-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                        "transition-all duration-200 group-hover:-translate-y-0.5"
                      )}
                      onClick={handleStartTherapy}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">
                            Começar Terapia
                          </div>
                          <div className="text-xs text-white/80">
                            Começar uma sessão nova
                          </div>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/mood hover:border-primary/50",
                          "justify-center items-center text-center",
                          "transition-all duration-200 group-hover:-translate-y-0.5"
                        )}
                        onClick={() => setShowMoodModal(true)}
                      >
                        <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                          <Heart className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                          <div className="font-medium text-xs">
                            Acompanhamento do Humor
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">
                            Como você está se sentindo?
                          </div>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/ai hover:border-primary/50",
                          "justify-center items-center text-center",
                          "transition-all duration-200 group-hover:-translate-y-0.5"
                        )}
                        onClick={handleAICheckIn}
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                          <BrainCircuit className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium text-xs">Check-in</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">
                            Rápida checagem do bem-estar
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Overview Card */}
            <Card className="border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resumo de Hoje</CardTitle>
                    <CardDescription>
                      Suas métricas de bem-estar para{" "}
                      {format(new Date(), "d MMMM, yyyy")}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    // onClick={fetchDailyStats}
                    className="h-8 w-8"
                  >
                    <Loader2 className={cn("h-4 w-4", "animate-spin")} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {wellnessStats.map((stat) => (
                    <div
                      key={stat.title}
                      className={cn(
                        "p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                        stat.bgColor
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                        <p className="text-sm font-medium">{stat.title}</p>
                      </div>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-right">
                  Última atualização: {format(dailyStats.lastUpdated, "h:mm a")}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                  Insights
                </CardTitle>
                <CardDescription>
                  Recomendações personalizadas com base nos seus padrões de
                  atividade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.length > 0 ? (
                    insights.map((insight, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-4 rounded-lg space-y-2 transition-all hover:scale-[1.02]",
                          insight.priority === "high"
                            ? "bg-primary/10"
                            : insight.priority === "medium"
                            ? "bg-primary/5"
                            : "bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <insight.icon className="w-5 h-5 text-primary" />
                          <p className="font-medium">{insight.title}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Activity className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p>
                        Complete mais atividades para receber insights
                        personalizadas!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <AnxietyGames />
            </div>
          </div>
        </div>
      </Container>

      <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Como você está se sentindo?</DialogTitle>
            <DialogDescription>
              Move o slider para vermos seu humor atual
            </DialogDescription>
          </DialogHeader>
          <MoodForm
            // onSubmit={handleMoodSubmit}
            onSuccess={() => setShowMoodModal(false)}
          />
        </DialogContent>
      </Dialog>

      <ActivityLogger
        open={showActivityLogger}
        onOpenChange={setShowActivityLogger}
      />
    </div>
  );
}
