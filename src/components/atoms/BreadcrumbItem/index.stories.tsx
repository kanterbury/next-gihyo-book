import { Meta } from "@storybook/react";
import BreadcrumbItem from "./";

export default { title: "Atoms/BreadcrumbItem" } as Meta<typeof BreadcrumbItem>;

export const Standard = () => (
  <div>
    <BreadcrumbItem>Item 1</BreadcrumbItem>
    <BreadcrumbItem>Item 2</BreadcrumbItem>
    <BreadcrumbItem>Item 3</BreadcrumbItem>
  </div>
);
