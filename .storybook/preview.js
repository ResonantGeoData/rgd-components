// import { withVuetify } from '@socheatsok78/storybook-addon-vuetify/dist/decorators'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// export const globalTypes = {
//   theme: {
//     name: 'Theme',
//     description: 'Global theme for components',
//     defaultValue: 'light',
//     toolbar: {
//       icon: 'circlehollow',
//       items: ['light', 'dark']
//     }
//   }
// }

export const decorators = [
  (story) => (
    ({
      template: '<v-app><story/></v-app>',
    })
  )
]
