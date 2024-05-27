import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  Spinner,
} from "react-bootstrap";
import Loading from "~/Components/Loading";
import useAdmin from "~/Hooks/useAdmin";
import { MAIN_TITLE } from "~/conf";
import { api } from "~/utils/api";

export default function EditUserProfile() {
  const router = useRouter();
  const { id } = router.query;

  const User = api.User.get.useQuery({ id: id as string });
  const UserUpdate = api.User.update.useMutation();

  const isAdmin = useAdmin();

  const [Name, setName] = useState<string | undefined>(undefined);
  const [Mail, setMail] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (User.data == null) return;

    if (User.data.name) {
      setName(User.data.name);
    }

    if (User.data.email) {
      setMail(User.data.email);
    }
  }, [User.data]);

  const handleSave = async () => {
    if (Name == null) return;
    if (Mail == null) return;
    setLoading(true);

    const res = await UserUpdate.mutateAsync({
      id: id as string,
      name: Name,
    });

    if (res) {
      setLoading(false);
      location.reload();
    }
  };

  if (User.isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>
          {User.data?.name} - {MAIN_TITLE}
        </title>
      </Head>
      <main>
        <Container className="mt-3">
          <h2 className="text-center">
            {User.data?.name ?? User.data?.email} bearbeiten
          </h2>

          <Form>
            <FloatingLabel className="mb-3" controlId="Name" label="Name">
              <FormControl
                type="name"
                placeholder="Name"
                required
                disabled={loading}
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              className="mb-3"
              controlId="Mail"
              label="E-Mail Adresse"
            >
              <FormControl
                type="email"
                placeholder="E-Mail Adresse"
                disabled={!isAdmin && loading}
                value={Mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </FloatingLabel>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  Speichert ... <Spinner animation="border" size="sm" />
                </>
              ) : (
                "Speichern"
              )}
            </Button>
          </Form>
        </Container>
      </main>
    </>
  );
}
