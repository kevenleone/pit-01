import NavigationBar from "../../../components/NavigationBar";

import AppContext, { initialState } from "../../../AppContext";

import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const NavigationBarWrapper = ({ state = initialState, dispatch }) => (
  <AppContext.Provider value={[state, dispatch]}>
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>
  </AppContext.Provider>
);

describe("NavigationBar", () => {
  it("renders", () => {
    const { asFragment } = render(<NavigationBarWrapper />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with context data", () => {
    const dispatch = jest.fn();

    const { container, queryByText } = render(
      <NavigationBarWrapper
        state={{
          ...initialState,
          loggedUser: {
            name: "Keven Leone",
          },
          me: {
            pokeDolar: 1000,
          },
        }}
        dispatch={dispatch}
      />
    );

    expect(container.querySelectorAll(".dynamic-route")).toHaveLength(3);
    expect(queryByText("Pokedolar $1000")).toBeTruthy();
    expect(queryByText("Welcome: Keven Leone")).toBeTruthy();

    const logoutButton = queryByText("Logout");

    fireEvent.click(logoutButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "SET_LOGGED_USER",
      payload: null,
    });
  });
});
