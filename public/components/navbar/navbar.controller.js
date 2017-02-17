'use strict';

angular.module('dashboardApp')
  .controller('NavbarController', NavbarController);

function NavbarController(Auth) {
    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.getCurrentUser = Auth.getCurrentUser;
}


