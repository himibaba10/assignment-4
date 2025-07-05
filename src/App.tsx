import { Outlet } from "react-router";
import Header from "./components/modules/shared/Header";
import Footer from "./components/modules/shared/Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
