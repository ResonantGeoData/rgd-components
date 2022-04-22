import Regions  from '@/components/molecules/Regions.vue';

export default {
  title: 'Molecules/Regions',
  component: Regions,
};

const Template = (args) => ({
  components: { Regions },
  setup() {
    return { args };
  },
  template: '<Regions v-bind="args"/>',
});

export const Primary = Template.bind({});
