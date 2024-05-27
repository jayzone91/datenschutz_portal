import { signIn, useSession } from "next-auth/react";
import { Button, Container } from "react-bootstrap";

export default function NotAllowed() {
  const { data: session } = useSession();

  return (
    <Container className="text-center">
      <h2>Keine Berechtigung</h2>
      <p>
        Dieses Angebot richtet sich ausschließlich an die Mitarbeiter der Firmen
        Computer Extra GmbH und AEM Communication GmbH & Co. KG
      </p>
      {session == null && (
        <Button onClick={() => void signIn()}>Bitte Anmelden</Button>
      )}
    </Container>
  );
}
