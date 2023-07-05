import type { Meta, StoryObj } from '@storybook/vue3';

import Nav from './index.vue';

const meta: Meta<typeof Nav> = {
  component: Nav,
};

export default meta;
type Story = StoryObj<typeof Nav>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { Nav },
    setup() {
      return { args };
    },
    template: '<Nav />',
  }),
};