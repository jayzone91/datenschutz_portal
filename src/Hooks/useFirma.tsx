import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ALLOWED_DOMAINS } from "~/conf";

export default function useFirma() {
  const { data: session } = useSession();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (session == null) return;

    if (session.user.email == null) return;

    const domain = session.user.email.split("@")[1];
    if (domain == null) return;

    if (ALLOWED_DOMAINS.includes(domain)) setAllowed(true);
  }, [session]);

  return allowed;
}
