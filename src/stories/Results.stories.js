import Results  from '@/components/molecules/Results.vue';

export default {
  title: 'Molecules/Results',
  component: Results,
};

const Template = (args) => ({
  components: { Results },
  setup() {
    return { args };
  },
  template: '<Results v-bind="args"/>',
});

export const Primary = Template.bind({});
