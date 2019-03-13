'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', controller.home.test);
  router.get('/login', controller.home.login);
  router.post('/login', controller.user.login);
  router.get('/logout', controller.user.logout);
  router.resources('user', '/user', controller.user);

  router.resources('activity', '/activity', controller.activity);
  router.resources('dataDictionary', '/dictionary', controller.dataDictionary);
  router.resources('activityModule', '/module', controller.activityModule);
  
  router.get('/*', controller.home.index);

};
