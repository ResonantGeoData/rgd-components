import DataPanel  from '@/components/organisms/DataPanel.vue';

export default {
  title: 'Organisms/DataPanel',
  component: DataPanel,
};

const Template = (args) => ({
  components: { DataPanel },
  setup() {
    return { args };
  },
  template: '<DataPanel v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {  };
