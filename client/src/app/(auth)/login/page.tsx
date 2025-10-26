"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState(false)

  const handleEye = () => {
    if(!eye) {
        setEye(true)
    } else {
        setEye(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-secondary/30">
      <Container className="flex flex-col items-center justify-center w-full">
        <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10 bg-card/0- backdrop-blur-lg mt-12">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1 tracking-tight">
              Login
            </h1>
            <p className="text-base text-muted-foreground font-medium">
              Bem-Vindo de volta! Por favor, faça o login para continuar sua
              jornada.
            </p>
          </div>

          <form action="" className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="email"
                className="block text-base font-semibold mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Insira seu email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-base font-semibold mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={!eye ? "password" : "text"}
                  placeholder="Insira sua senha"    
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-muted-foreground"
                  required
                />
                <span className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2" onClick={handleEye}>
                    {eye ? <Eye /> : <EyeClosed />}
                </span>
              </div>
            </div>

            <Button
              className="w-full py-2 text-base rounded-xl font-bold bg-linear-to-r from-primary to-primary/80 shadow-md hover:from-primary/80 hover:to-primary"
              size={"lg"}
              type="button"
            >
              Entrar
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">
                Não tem uma conta?
            </span>
            <Link href={"/signup"} className="text-primary font-semibold underline">
                  Cadastrar
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href={"/forgot-password"} className="text-primary underline">
                  Esqueceu a senha?
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
