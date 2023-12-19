import "./style.css";
import { Link } from "react-router-dom";
import { ArrowDown, Logo } from "../../svg";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";

export default function Header({ page }) {
  const { user } = useSelector((user) => ({ ...user }));
  const [showUserMenu, setShowUserMenu] = useState(false);
  const usermenu = useRef(null);

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        {/* Search input field */}
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
      </div>

      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>

        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={usermenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
