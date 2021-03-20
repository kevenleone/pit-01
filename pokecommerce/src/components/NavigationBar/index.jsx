import ClayLink from "@clayui/link";
import ClayNavigationBar from "@clayui/navigation-bar";
import { useHistory, useLocation } from "react-router";

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
    name: "Cart",
    path: "/cart",
  },
];

const NavigationBar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <ClayNavigationBar triggerLabel="Item 1">
      {routes.map(({ name, path }) => (
        <ClayNavigationBar.Item key={path} active={path === location.pathname}>
          <ClayLink
            onClick={() => history.push(path)}
            className="nav-link"
            displayType="unstyled"
          >
            {name}
          </ClayLink>
        </ClayNavigationBar.Item>
      ))}
    </ClayNavigationBar>
  );
};

export default NavigationBar;
