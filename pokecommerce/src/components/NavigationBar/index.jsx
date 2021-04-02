import React, { useContext, useState } from "react";
import ClayLink from "@clayui/link";
import ClayNavigationBar from "@clayui/navigation-bar";
import ClaySticker from "@clayui/sticker";
import ClayDropDown from "@clayui/drop-down";
import { useHistory, useLocation } from "react-router";
import ClayIcon from "@clayui/icon";
import AppContext from "../../AppContext";
import { tokenKey } from "../../utils/util";

const routes = [
  {
    name: "Pokemons",
    path: "/",
  },
  {
    name: "Wishlist",
    path: "/wishlist",
  },
  {
    name: "Purchased Pokemon",
    path: "/cart",
  },
];

const NavigationBar = () => {
  const [{ loggedUser, me }, dispatch] = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const [active, setActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(tokenKey);

    setActive(false);

    dispatch({ type: "SET_LOGGED_USER", payload: null });

    history.push("/auth");
  };

  return (
    <ClayNavigationBar triggerLabel="My Pokemon Commerce">
      <>
        {routes.map(({ name, path }) => (
          <ClayNavigationBar.Item
            key={path}
            className="dynamic-route"
            active={path === location.pathname}
          >
            <ClayLink
              onClick={() => history.push(path)}
              className="nav-link"
              displayType="unstyled"
            >
              {name}
            </ClayLink>
          </ClayNavigationBar.Item>
        ))}
      </>
      
      <ClayNavigationBar.Item>
        <ClayLink className="nav-link" displayType="unstyled">
          Pokedolar ${me.pokeDolar}
        </ClayLink>
      </ClayNavigationBar.Item>

      {loggedUser ? (
        <ClayNavigationBar.Item>
          <ClayDropDown
            trigger={
              <div>
                <ClaySticker displayType="primary" size="lg">
                  <ClayIcon symbol="user" />
                </ClaySticker>
              </div>
            }
            active={active}
            onActiveChange={setActive}
          >
            <ClayDropDown.Help>{`Welcome: ${loggedUser.name}`}</ClayDropDown.Help>
            <ClayDropDown.ItemList>
              <ClayDropDown.Item onClick={handleLogout}>
                Logout
              </ClayDropDown.Item>
            </ClayDropDown.ItemList>
          </ClayDropDown>
        </ClayNavigationBar.Item>
      ) : (
        <></>
      )}
    </ClayNavigationBar>
  );
};

export default NavigationBar;
