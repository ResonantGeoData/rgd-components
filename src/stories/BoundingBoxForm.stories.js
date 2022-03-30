import boundingBox from '@/components/molecules/BoundingBoxForm.vue';

export default {
  title: 'BoundingBox',
  component: boundingBox,
};

const Template = (args) => ({
  components: { boundingBox },
  setup() {
    return { args };
  },
  template: '<boundingBox v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Search',
 };

export const Secondary = Template.bind({});
Secondary.args = {  };
