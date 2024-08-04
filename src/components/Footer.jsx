import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center py-2 text-lg">
      Made with <span className="text-red-600">&hearts;</span> by
      <Link to="https://github.com/kuldp18"> Kuldeep</Link>
    </footer>
  );
};

export default Footer;
