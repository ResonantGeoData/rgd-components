import CesiumViewer  from '@/components/organisms/CesiumViewer.vue';


export default {
  title: 'Organisms/CesiumViewer',
  component: CesiumViewer,
};

const Template = (args) => ({
  components: { CesiumViewer },
  setup() {
    return { args };
  },
  template: '<CesiumViewer v-bind="args"/>',
});

export const Primary = Template.bind({});
