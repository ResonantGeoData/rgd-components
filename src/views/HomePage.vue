<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import OAuthClient from '@girder/oauth-client';

import CesiumViewer from '@/components/organisms/CesiumViewer.vue';

export default defineComponent({
  components: {
    CesiumViewer,
  },
  setup() {
    const oauthClient = inject<OAuthClient>('oauthClient');
    if (oauthClient === undefined) {
      throw new Error('Must provide "oauthClient" into component.');
    }

    const loginText = computed(() => (oauthClient.isLoggedIn ? 'Logout' : 'Login'));
    const logInOrOut = () => {
      if (oauthClient.isLoggedIn) {
        oauthClient.logout();
      } else {
        oauthClient.redirectToLogin();
      }
    };

    return { oauthClient, loginText, logInOrOut };
  },
});
</script>

<template>
  <CesiumViewer />
  <v-app-bar app>
    <v-spacer />
    <v-btn
      text
      @click="logInOrOut"
    >
      {{ loginText }}
    </v-btn>
  </v-app-bar>
</template>
