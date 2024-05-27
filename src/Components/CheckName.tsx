import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CheckName() {
  const { data: session } = useSession();

  if (session == null) return <></>;

  if (session?.user.name == null)
    return (
      <div className="">
        <p className="text-danger text-center fs-2">
          Bitte das Profil bearbeiten und einen Namen vergeben.
        </p>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-primary btn-lg mb-3" href={"profile/edit"}>
            Jetzt Namen vergeben
          </Link>
        </div>
      </div>
    );

  return <></>;
}
