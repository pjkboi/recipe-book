import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../components/Home.vue'),
  },
  {
    path: '/add-recipe',
    name: 'Add Recipe',
    component: () => import(/* webpackChunkName: "about" */ '../components/AddRecipe.vue'),
    meta: {
      auth: true,
    },
  },  
  {
    path: '/edit-recipe',
    name: 'Edit Recipe',
    component: () => import(/* webpackChunkName: "about" */ '../components/EditRecipe.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import(/* webpackChunkName: "about" */ '../components/Recipes.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Profile.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue'),
    meta: {
      guest: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else if (to.matched.some(record => record.meta.guest)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next({
          path: '/profile',
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
