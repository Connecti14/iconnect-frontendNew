import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({userData,logoutAdmin}) => {
  const navigate=useNavigate()
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    homeLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    menuClass: "",
  });

  const toggleMenu = () => {
    setState((prevState) => ({
      ...prevState,
      menu: !prevState.menu,
    }));
  };

  const toggleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  const show = state.menu ? "show" : "";
//   const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        style={{ marginRight: "10px" }}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <Link className="navbar-brand" to="/">
        iConnect
      </Link>

      <div className={`collapse navbar-collapse navbarLink ${show}`}>
        <div className="navbar-nav">
          <Link
            className="nav-item nav-link"
            to="/blogs"
            // onClick={() => toggleOpen()}
          >
            Blogs
          </Link>
          {
            userData &&
            <Link
            className="nav-item nav-link"
            to="/create"
          >
            Create Blog
          </Link>
          }
         
          {
            userData && <Link
            className="nav-item nav-link"
            to="/admin"
           
          >
            Admin
          </Link>
          }
         {
          !userData ?
          <Link
          className="nav-item nav-link"
          to="/login"
          onClick={() => toggleOpen()}
        >
          Login
        </Link>
        :
        <button onClick={()=>{logoutAdmin(navigate)}}  className="nav-item nav-link">Logout</button>
         }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
