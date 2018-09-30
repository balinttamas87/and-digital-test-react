import React from "react";
import renderer from "react-test-renderer";
import Story from "..";

it("Renders <Story /> component and matches snapshot", () => {
  const component = renderer.create(
    <Story title="Title" score={100} by="author" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
