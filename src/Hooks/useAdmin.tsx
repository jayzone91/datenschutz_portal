import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function useAdmin() {
  const { data: session } = useSession();
  const Finder = api.User.find.useMutation();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function x() {
      if (session == null) return false;
      if (session.user == null) return false;

      const User = await Finder.mutateAsync({
        id: session.user.id,
      });
      if (User == null) return false;
      if (User.isAdmin) setIsAdmin(true);
    }
    void x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAdmin;
}
