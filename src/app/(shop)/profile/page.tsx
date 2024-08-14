import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    //redirect('/auth/login?returnTo=/profile')
    redirect('/')
  }

  return (
    <div>
      <Title title={"PROFILE"} subtitle="User data" />
      <pre>
        {
          JSON.stringify(session.user, null, 2)
        }

        <p className="text-2xl">{session.user.role}</p>
      </pre>
    </div>
  );
}