"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Navegação simulada — autenticação real será implementada em uma etapa futura.
    setLoading(true);
    setTimeout(() => {
      router.push("/painel");
    }, 500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-8">
          <Logo />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Usuário"
            name="usuario"
            type="text"
            placeholder="Digite seu usuário"
            autoComplete="username"
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
          />

          <Button type="submit" className="mt-2" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
