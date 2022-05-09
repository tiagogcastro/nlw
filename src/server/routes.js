const { Router } = require('express');

const routes = Router();

const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  pageSucess,
} = require('./pages');

routes.get("/", pageLanding);
routes.get("/study", pageStudy);
routes.get("/give-classes", pageGiveClasses);
routes.get('/sucesso', pageSucess);
routes.post('/save-classes', saveClasses);

module.exports = {
  routes
};