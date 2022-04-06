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
  footPrint: {
    type: "Polygon",
    coordinates: [
      [
        [
          -84.14505029585798,
          39.808049541284404
        ],
        [
          -84.07694970414201,
          39.808049541284404
        ],
        [
          -84.07694970414201,
          39.75395045871559
        ],
        [
          -84.14505029585798,
          39.75395045871559
        ],
        [
          -84.14505029585798,
          39.808049541284404
        ]
      ]
    ]
  }
 };
