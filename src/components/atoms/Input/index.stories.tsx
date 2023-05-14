import { Meta, StoryFn } from "@storybook/react";
import Input from "./";

export default {
  title: "Atoms/Input",
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "プレースホルダー",
      table: {
        type: { summary: "string" },
      },
    },
    hasBorder: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "ボーダーフラグ",
      table: {
        type: { summary: "boolean" },
      },
    },
    hasError: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "バリデーションエラーフラグ",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Normal = Template.bind({});

export const Error = Template.bind({});
Error.args = { hasError: true };
