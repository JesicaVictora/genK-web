import { Router } from '@vaadin/router';
import '../pages/home.page';
import '../components/menu.component';
import '../pages/pokedex.page';
import '../pages/pokemon.page';

const outlet = document.getElementById('outlet');
const router = new Router(outlet);


router.setRoutes([
    { path: '/', component: 'home-page' },
    { path: '/pokedex', component: 'pokedex-page' },
    { path: '/pokemon', component: 'pokemon-page' },
    { path: '(.*)', redirect: '/' }
]);


