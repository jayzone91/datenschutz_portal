import Link from "next/link";
import {
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "react-bootstrap";
import Loading from "~/Components/Loading";
import { api } from "~/utils/api";

export default function UserAdmin() {
  const User = api.User.getAll.useQuery();

  if (User.isLoading) return <Loading />;

  return (
    <Container className="mt-5">
      <h2 className="text-center">Benutzer Admin</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>mail</th>
            <th>admin</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {User.data?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "✔️" : "❌"}</td>
              <td>
                <Dropdown>
                  <DropdownToggle variant="danger" id="actions-dropdown">
                    Actions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      as={Link}
                      href={"/admin/user/edit/" + user.id}
                    >
                      Bearbeiten
                    </DropdownItem>
                    <DropdownItem>Toggle Admin</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Löschen</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
