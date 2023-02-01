import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import logo from "../images/logo.svg";
import "../globalStyles.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setShow, dispatch, userLogout } = useAuthContext();

    const handleClick = async (action) => {
        if (action === "logout") {
            await userLogout();
            return dispatch({ type: "LOGOUT" });
        }
        dispatch({ type: `CLICK_${action}`, payload: `${action}` });
        await setShow(true);
    };

    return (
        <div className="navbar">
            <img src={logo} alt="DragonSnake" className="logo" onClick={() => navigate("/")} />
            <p className="greeting">
                Welcome {user ? user.username : "Guest"}!
                {user && (
                    <button
                        className="signIn"
                        onClick={() => navigate("/profile")}
                        type="button"
                    >
                        My Profile
                    </button>
                )}

               

                <button
                    type="button"
                    className="signIn"
                    onClick={
                        user
                            ? () => handleClick("logout")
                            : () => handleClick("login")}>
                    {user ? "Log Out" : "Log In"}
                </button>

                {!user && (
                    <button
                        className="playBut1"
                        onClick={() => handleClick("signup")}
                        type="button"
                    >
                        Signup
                    </button>
                )}



            </p>
        </div>
    );
};

export default Navbar;
