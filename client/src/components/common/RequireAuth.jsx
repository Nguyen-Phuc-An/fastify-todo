import { Navigate, Outlet, useLocation } from "react-router-dom";
import { path } from "../../constant/path";

const RequireAuth = ({ requireAdmin = false }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('isLoggedIn: ', isLoggedIn)
    const isAdmin = localStorage.getItem('isAdmin') === '1';
    const location = useLocation();

    // Chưa đăng nhập → chuyển về trang login và nhớ đường dẫn gốc
    if (!isLoggedIn)  return <Navigate to={path.LOGIN} state={{ from: location }} replace />;

    if (requireAdmin && !isAdmin)  return <Navigate to={path.HOME} replace />;
    
    // Đã đăng nhập → cho hiển thị các route con
    return <Outlet />;
};

export default RequireAuth;
