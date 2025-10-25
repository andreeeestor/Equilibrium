"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/Container";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Call backend to send reset email
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-secondary/30">
      <Container className="flex flex-col items-center justify-center w-full">
        <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10 bg-card/90 backdrop-blur-lg mt-20">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1 tracking-tight">
              Esqueceu a Senha?
            </h1>
            <p className="text-base text-muted-foreground font-medium">
              Insira seu email para receber o link para redefinir sua senha.
            </p>
          </div>
          {submitted ? (
            <div className="text-center py-8">
              <p className="text-lg text-primary font-semibold mb-2">
                Veja seu email!
              </p>
              <p className="text-muted-foreground">
                Se a conta já existe, um link para redefinir a senha foi enviado.
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-semibold mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Insira seu email"
                    className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-muted-foreground"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                className="w-full py-2 text-base rounded-xl font-bold bg-linear-to-r from-primary to-primary/80 shadow-md hover:from-primary/80 hover:to-primary"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          )}
          <div className="my-6 border-t border-primary/10" />
          <p className="text-base text-center text-muted-foreground">
            Lembrou sua Senha?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold underline hover:text-primary/80 transition-colors"
            >
              Entrar
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}
