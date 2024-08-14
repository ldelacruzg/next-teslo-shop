import { LoginForm } from "@/components/auth/LoginForm";
import { titleFont } from "@/config/fonts";

interface Props {
  searchParams: {
    redirectTo?: string;
  }
}

export default function LoginPage({ searchParams }: Props) {
  const redirectTo = searchParams.redirectTo;

  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>
      <LoginForm redirectTo={redirectTo} />
    </main>
  );
}
