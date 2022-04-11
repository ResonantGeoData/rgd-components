import DateRange from '@/components/atoms/DateRange.vue';
import TimeRange from '@/components/atoms/TimeRange.vue';

export default {
  title: 'DateRange',
  component: DateRange,
  subcomponents: {TimeRange},
};

const Template = (args) => ({
  components: { DateRange, TimeRange },
  setup() {
    return { args };
  },
  template: '<DateRange v-bind="args"><TimeRange/></DateRange>',
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Date and Time',
 };

export const Secondary = Template.bind({});
Secondary.args = {  };
