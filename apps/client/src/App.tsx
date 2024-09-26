import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Outlet />
    </>
  );
}

export default App;
