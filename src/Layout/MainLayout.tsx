import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarText,
  NavbarToggle,
} from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";
import { MAIN_TITLE } from "~/conf";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const isAdmin = useAdmin();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }, []);

  return (
    <Container
      fluid
      className="bg-body-tertiary"
      style={{ minHeight: "100vh" }}
    >
      {/* Navbar */}
      <Navbar bg="dark" expand="lg">
        <Container>
          <NavbarBrand href="/">{MAIN_TITLE}</NavbarBrand>
          <NavbarToggle id="main-menu" />
          <NavbarCollapse id="main-menu">
            <Nav className="mt-auto">
              <NavLink as={Link} href="/">
                Dashboard
              </NavLink>
              <NavLink as={Link} href="/">
                Tests
              </NavLink>
              {isAdmin && (
                <>
                  <NavLink as={Link} href="/">
                    Auswertungen
                  </NavLink>
                  <NavLink as={Link} href="/">
                    Tests verwalten
                  </NavLink>
                  <NavLink as={Link} href="/">
                    Benutzer verwalten
                  </NavLink>
                </>
              )}
              <NavLink as={Link} href="/">
                Datenschutz
              </NavLink>
              <NavLink as={Link} href="/">
                Impressum
              </NavLink>
            </Nav>
          </NavbarCollapse>
          <NavbarCollapse className="justify-content-end">
            {/* TODO: Abmelden und Profil Knopf einfügen */}
            <NavbarText>
              {session?.user ? (
                <>
                  <NavDropdown
                    id="UserDropdown"
                    title={
                      "Angemeldet als: " + session.user.name ??
                      session.user.email
                    }
                    menuVariant="dark"
                  >
                    <NavDropdown.Item
                      as={Link}
                      href={"/profile/edit/" + session.user.id}
                    >
                      Benutzer
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={(e) => {
                        e.preventDefault();
                        void signOut();
                      }}
                    >
                      Abmelden
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      void signIn();
                    }}
                  >
                    Anmelden
                  </a>
                </>
              )}
            </NavbarText>
          </NavbarCollapse>
        </Container>
      </Navbar>

      {/* Content */}
      {children}
    </Container>
  );
}
