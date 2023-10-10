import { getJWTToken } from '../utilities/jwtDB.mjs';

const isAuthenticated = async () => {
  try {
    const token = await getJWTToken();
    const result = !!token;
    return result;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

const router = {
  routes: [
    {
      path: '/',
      controller: 'dashboardController',
      protected: true,
    },
    {
      path: '/config',
      controller: 'configController',
      protected: true,
    },
    {
      path: '/devices',
      controller: 'devicesController',
      protected: true,
    },
    {
      path: '/admin',
      controller: 'adminController',
      protected: true,
    },
    {
      path: '/login',
      controller: 'loginController',
      protected: false,
    },
  ],
  handleRouteChange(route) {
    window.history.pushState({}, '', route.path);
    import(`./controllers/${route.controller}.mjs`)
      .then((controllerModule) => {
        if (
          controllerModule.default &&
          typeof controllerModule.default.init === 'function'
        ) {
          controllerModule.default.init();
        } else {
          console.error(
            'Controller does not have an init method:',
            route.controller
          );
        }
      })
      .catch((err) => console.error(err));
  },
  async checkRouteChange() {
    const route = this.routes.find((r) => window.location.pathname === r.path);
    if (!route) {
      return this.handleRouteChange({
        path: '/not-found',
        controller: '404Controller',
      });
    }

    const auth = await isAuthenticated();

    if ((route.protected && auth) || (!route.protected && !auth)) {
      return this.handleRouteChange(route);
    }

    if (route.protected && !auth) {
      return this.handleRouteChange({
        path: '/login',
        controller: 'loginController',
      });
    }

    if (!route.protected && auth) {
      return this.handleRouteChange({
        path: '/',
        controller: 'dashboardController',
      });
    }
  },
  navigateTo(path) {
    const route = this.routes.find((r) => r.path === path);
    if (!route) {
      path = '/not-found';
    }
    window.history.replaceState({}, '', path);
    this.checkRouteChange();
  },
  bindNavigationEvents() {
    const navigationElements = document.querySelectorAll('.nav-path');
    navigationElements.forEach((navigationElement) => {
      navigationElement.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target.closest('a');
        const path = new URL(target.href).pathname;
        this.navigateTo(path);
      });
    });
  },
  init() {
    window.addEventListener('popstate', this.checkRouteChange.bind(this));
    this.checkRouteChange();
  },
};

export default router;
