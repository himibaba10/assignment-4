const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="max-sm:text-sm text-center py-3">
      © {year} All rights reserved by Ferdous Ahmed
    </footer>
  );
};

export default Footer;
