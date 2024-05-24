import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }, []);

  return (
    <Container fluid className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Container fluid className="bg-body-tertiary">
        <div id="content">{children}</div>
        <Footer />
      </Container>
    </Container>
  );
}

function Sidebar() {
  const { data: session } = useSession();
  const isAdmin = useAdmin();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 fixed"
      id="sidebar"
      style={{ width: 200, height: "100vh" }}
    >
      <Link
        href="/"
        className="d-flex me-md-auto text-decoration-none text-white justify-content-center align-content-center"
      >
        <p className="text-center">CompEx</p>
      </Link>
      <hr />
      {/* Navigation */}
      <ul className="nav nav-pills flex-column mb-auto gap-2 text-white">
        <li className="nav-item">
          <Link className="nav-link text-white" href="/">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" href="/2">
            Tests
          </Link>
        </li>
        {isAdmin && (
          <>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/3">
                Auswertungen
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/4">
                Tests verwalten
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/5">
                Benutzer verwalten
              </Link>
            </li>
          </>
        )}
      </ul>
      <hr />
      {/* Footer */}
      {session?.user ? (
        <Dropdown>
          <DropdownToggle id="dropdown-autoclose-true" variant="secondary">
            <strong>
              {session.user.name
                ? session.user.name.split(" ")[0]
                : session.user.email?.split("@")[0]}
            </strong>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem as={Link} href="/new">
              New Project
            </DropdownItem>
            <DropdownItem as={Link} href="/setting">
              Settings
            </DropdownItem>
            <DropdownItem as={Link} href="/user">
              Profile
            </DropdownItem>
            <DropdownDivider />

            <DropdownItem onClick={() => void signOut}>Abmelden</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button variant="secondary" onClick={() => void signIn()}>
          Anmelden
        </Button>
      )}
    </div>
  );
}

function Footer() {
  const [margin, setMargin] = useState(0);
  useEffect(() => {
    function calculateMargin() {
      const footer = document.querySelector("#footer")!;

      const footerHeight = footer.clientHeight;
      if (footerHeight == null) return 0;

      const content = document.querySelector("#content")!;
      const page = document.querySelector("#sidebar")!;
      if (page == null) return 0;
      const pageHeight = page.clientHeight - content.clientHeight;
      console.log(footerHeight);
      console.log(pageHeight);
      return pageHeight - (footerHeight + footerHeight / 2);
    }
    setMargin(calculateMargin());
  }, []);
  return (
    <footer className="py-0" style={{ marginTop: margin }} id="footer">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" href="/Datenschutz">
            Datenschutz
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" href="/Impressum">
            Impressum
          </Link>
        </li>
      </ul>
      <p className="text-center text-muted">
        &copy; 2024 Computer Extra GmbH | Designed by Johannes Kirchner
      </p>
    </footer>
  );
}
