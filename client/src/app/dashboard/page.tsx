"use client";

import { Container } from "@/components/Container";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircleHeart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <Container className="pt-20 pb-8 space-y-6">
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-3xl font-bold">Bem-Vindo(a) de volta!</h1>
            <p className="text-muted-foreground text-sm">
              {currentTime.toLocaleDateString("pt-BR", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Card className="border-primary/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary/10 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Ações Rápidas</h3>
                    <p className="text-sm">Comece sua jornada do bem-estar</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button
                    variant={"default"}
                    className={cn(
                      "w-full justify-between items-center p-6 h-auto group/button",
                      "bg-linear-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                      "transitionn-all duration-200 group-hover:-translate-y-0.5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageCircleHeart className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Começar Terapia
                        </h3>
                        <p className="text-sm">Comece uma nova sessão</p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                      <ArrowRight className="size-5 text-white" />
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
