import CollectionsComponent  from '@/components/atoms/Collections.vue';

export default {
  title: 'Atoms/CollectionsComponent',
  component: CollectionsComponent,
};

const Template = (args) => ({
  components: { CollectionsComponent },
  setup() {
    return { args };
  },
  template: '<CollectionsComponent v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {  };
