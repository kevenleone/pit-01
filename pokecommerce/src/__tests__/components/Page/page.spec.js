import Page from "../../../components/Page";

import { render } from "@testing-library/react";

describe("Page Component", () => {
  it("renders", () => {
    const { asFragment } = render(<Page />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("render with props", () => {
    const { queryByText } = render(
      <Page title="Pokemon List">
        <div className="pokemon--list">
          <span>Pokemon A</span>
          <span>Pokemon B</span>
          <span>Pokemon C</span>
        </div>
      </Page>
    );

    expect(queryByText("Pokemon List")).toBeTruthy();
    expect(queryByText("Pokemon A")).toBeTruthy();
    expect(queryByText("Pokemon B")).toBeTruthy();
    expect(queryByText("Pokemon C")).toBeTruthy();
  });
});
