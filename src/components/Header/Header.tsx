import { useState } from "react";
import styles from "./Header.module.scss";
import { NavItem, styledActive } from "../NavItem/NavItem";
import { NAV_ITEMS } from "../../constants/constJS";
import { IconLink } from "../IconLink/IconLink";
import { RoutesLink } from "../../types/routes";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { useAppSelector } from "../../hooks/helperToolkit";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const cartItemCount = useAppSelector((state) => state.cart.items.length);
  const user = auth.currentUser;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };

  const isFavoritesPage = location.pathname === RoutesLink.FavoritesPage;
  const isCartPage = location.pathname === RoutesLink.CartPage;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Link to={RoutesLink.HomePage}>
              <div className={styles.logo_icon}></div>
            </Link>
          </div>

          <nav className={styles.navContainer}>
            <ul className={styles.navigation}>
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.name} {...item} />
              ))}
            </ul>
          </nav>

          <div className={styles.iconsBlock}>
            {user ? (
              <>
                <button onClick={handleLogout} className={styles.signout}>
                  Sign out
                </button>
                <div className={`${styles.favorites} ${isFavoritesPage ? styles.active : ""}`} >
                  <IconLink
                    to={RoutesLink.FavoritesPage}
                    iconSrc={"img/icons/favorites-icon.svg"}
                    alt="The icon of favorites page"
                    className={styles.favoritesButton}
                  />
              {favoritesCount > 0 && (
                <span className={styles.countBadge}>{favoritesCount}</span>
              )}
                </div>
              </>
            ) : (
              <>
                <nav className={styles.auth_container}>
                  <ul className={styles.auth}>
                    <li>
                      <NavLink to="/signup" className={styledActive}>
                        Sign up
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className={styledActive}>
                        Log in
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </>
            )}

            <div className={`${styles.cart} ${isCartPage ? styles.active : ""}`} >
              <IconLink
                to={RoutesLink.CartPage}
                iconSrc={"img/icons/cart-logo.svg"}
                alt="The icon of cart page"
                className={styles.cartButton}
              />
              {cartItemCount > 0 && (
                <span className={styles.countBadge}>{cartItemCount}</span>
              )}
            </div>

            <div className={styles.burgerIcon} onClick={toggleMenu}>
              <IconLink
                to="#"
                iconSrc={"img/icons/burger-menu-icon.svg"}
                alt="burger-menu-icon"
                className={styles.iconLink}
              />
            </div>
          </div>
        </div>
      </header>

      <div className={`${styles.side_menu} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.menu_content}>
          <BurgerMenu onClose={closeMenu} />
        </div>
      </div>
    </>
  );
};
