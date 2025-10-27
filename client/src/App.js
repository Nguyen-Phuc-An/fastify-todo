import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Homepage, Login, Register, MyTodos } from "./pages/index";
import { UserLayout } from "./layouts/index";
import {path} from './constant/path'
import { useEffect } from 'react'
import { apiGetCurrentUser } from "./api/user";

function App() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Gọi apiGetCurrentUser khi isLoggedIn là true
    useEffect(() => {
        const getCurrentUser = async () => {
            if (isLoggedIn) {
                try {
                    await apiGetCurrentUser();
                } catch (error) {
                    console.error('Error getting current user:', error);
                }
            }
        };
        getCurrentUser();
    }, [isLoggedIn]);

  // Theo dõi thay đổi localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            window.location.reload(); // Reload để cập nhật isLoggedIn
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="min-h-screen">
            <Routes>
                <Route path={path.HOME} element={<UserLayout />} >
                    <Route index element={<Homepage/>}/>
                    <Route path="*" element={<Navigate to={path.HOME} replace />} />
                    <Route path={path.REGISTER} element={<Register/>} />
                    <Route path={path.LOGIN} element={<Login/>} />
                    <Route path={path.TASK} element={<MyTodos />} />
                </Route>
            </Routes> 

            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                className="custom-toast-container"
            />
        </div>
    );
}

export default App;
