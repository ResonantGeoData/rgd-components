import ToolBar from '@/components/molecules/ToolBar.vue';

export default {
  title: 'Molecules/ToolBar',
  component: ToolBar,
};

const Template = (args) => ({
  components: { ToolBar },
  setup() {
    return { args };
  },
  template: '<ToolBar v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Search',
 };
