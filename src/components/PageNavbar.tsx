import { ReactNode } from 'react';
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';

const NavbarBrand = (props: Parameters<typeof Navbar.Brand>[0]): JSX.Element => (
  <Navbar.Brand as={NavLink} {...props} />
);

interface PageNavbarProps {
  className?: string;
  label: string;
  children?: ReactNode;
}

export const PageNavbar = ({ className, label, children }: PageNavbarProps): JSX.Element => (
  <Navbar className={className} bg="dark" variant="dark">
    <Container fluid="sm">
      <NavbarBrand href="/">{label}</NavbarBrand>
      {children && <Nav className="me-auto">{children}</Nav>}
    </Container>
  </Navbar>
);

export const NavbarLink = (props: Parameters<typeof Nav.Link>[0]): JSX.Element => <Nav.Link as={NavLink} {...props} />;
