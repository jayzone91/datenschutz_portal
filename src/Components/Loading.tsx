import { Container, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Container className="d-flex justify-content-center align-content-center mt-5">
      <Spinner animation="border" style={{ width: "12rem", height: "12rem" }} />
    </Container>
  );
}
