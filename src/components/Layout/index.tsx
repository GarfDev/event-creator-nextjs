import { ReactNode } from "react";
import Navbar from "../Navbar";
import { Container } from "./styles";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
