import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="font-poppins">
      <Toaster position="top-center" />
      <Outlet />
    </div>
  );
}

export default App;
