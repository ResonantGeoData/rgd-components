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
Primary.args = {
  initialDestination: {longitude: -93.849688, latitude: 40.690265, height: 4000000}
 };
