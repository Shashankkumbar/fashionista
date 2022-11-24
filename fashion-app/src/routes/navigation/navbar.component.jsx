import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { useSelector, useDispatch } from "react-redux";
import {
  NavigationContainer,
  LogoConatainer,
  NavLink,
  NavLinksContainer,
} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart()); //afer redux sagas
  return (
    <Fragment>
      <NavigationContainer>
        <LogoConatainer to="/">
          <CrwnLogo className="logo" />
        </LogoConatainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />

          {isCartOpen && <CartDropdown />}
        </NavLinksContainer>
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
