import { Outlet } from "react-router-dom";
import NavBar from "../components/Shared/NavBar/NavBar";
import Footer from "../components/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";


const MainLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
            <Toaster />
        </div>
    );
};

export default MainLayout;