import React from "react";
import { shallow, mount } from "enzyme";

import Story from "..";

describe("Story component", () => {
  it("should render without throwing an error", () => {
    expect(
      shallow(<Story title="Title" score={100} by="author" />).contains(
        <div className="story-details-wrapper">
          <p className="story-details">{"100 points by author"}</p>
        </div>
      )
    ).toBe(true);
  });

  it('should be selectable by class "story"', () => {
    expect(shallow(<Story />).is(".story")).toBe(true);
  });

  it("should mount in a full DOM", () => {
    expect(mount(<Story />).find(".story").length).toBe(1);
  });
});
