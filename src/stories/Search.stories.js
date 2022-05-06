import Search  from '@/components/molecules/Search.vue';

export default {
  title: 'Molecules/Search',
  component: Search,
};

const Template = (args) => ({
  components: { Search },
  setup() {
    return { args };
  },
  template: '<Search v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {  };

export const Secondary = Template.bind({});
Secondary.args = {  };
