const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('main', '/','/index')
routes.add('customer','/customer');
routes.add('vendor','/vendor');
