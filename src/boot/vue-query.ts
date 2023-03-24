import { VueQueryPlugin } from '@tanstack/vue-query';
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {

  VueQueryPlugin.install( app, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60,
        }
      }
    }
  } );

})
