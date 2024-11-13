import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axe from 'axe-core' // Alterado para import


const app = createApp(App).use(router)

axe.run().then(results => {
    if (results.violations.length) {
        throw new Error('Accessibility issues found');
    }
}).catch(err => {
    console.error('Something bad happened:', err.message);
});

app.use(store)
app.mount('#app')
