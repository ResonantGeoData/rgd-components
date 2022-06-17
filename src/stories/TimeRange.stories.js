import TimeRange  from '@/components/atoms/TimeRange.vue';

export default {
  title: 'Atoms/TimeRange',
  component: TimeRange,
};

const Template = (args) => ({
  components: { TimeRange },
  setup() {
    return { args };
  },
  template: '<TimeRange v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {  };
