import DateRange from '@/components/atoms/DateRange.vue';

export default {
  title: 'DateRange',
  component: DateRange,
};

const Template = (args) => ({
  components: { DateRange },
  setup() {
    return { args };
  },
  template: '<DateRange v-bind="args" />',
});

export const Primary = Template.bind({});
