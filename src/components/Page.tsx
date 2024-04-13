import { Col, Container, Row } from 'react-bootstrap';
import { PageNavbar } from 'components/PageNavbar';

export const Page = ({ className, children, ...rest }: Parameters<typeof Col>[0]): JSX.Element => (
  <>
    <PageNavbar label="Memo list" />
    <Container className="py-4" fluid="sm">
      <Row>
        <Col {...rest}>{children}</Col>
      </Row>
    </Container>
  </>
);
