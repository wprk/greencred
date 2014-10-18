Router.map(function() {
  
  // App Pages
  this.route('dashboard', {
    path: '/dashboard',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'defaultHeader': {to: 'header'},
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('tracker', {
    path: '/tracker',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'defaultHeader': {to: 'header'},
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
});