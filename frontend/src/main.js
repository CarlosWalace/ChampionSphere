import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axe from 'axe-core'


const app = createApp(App).use(router)
app.use(store)


if (process.env.NODE_ENV === 'development') {
    app.mount('#app');
  
    // Executa o axe-core para analisar acessibilidade
    axe.run(document, {
      rules: {
        // Aqui você pode configurar ou desabilitar regras específicas, se necessário
      },
    }).then(results => {
      if (results.violations.length) {
        console.warn(' Problemas detectados: ');
        console.table(results.violations);
      } else {
        console.log('Nenhum problema detectado!');
      }
    }).catch(err => {
      console.error('Erro ao executar axe-core!', err);
    });
  } else {
    app.mount('#app');
  }
