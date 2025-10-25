"use client";

import { Button } from "../ui/button";
import Link from "next/link";
interface SignInButtonProps {
  className?: string;
}
export default function SignInButton(props: SignInButtonProps) {
  return (
    <Button asChild className={props.className}>
      <Link href={"/login"}>Entrar</Link>
    </Button>
  );
}
