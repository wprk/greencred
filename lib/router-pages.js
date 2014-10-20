Router.map(function() {
  
  // App Pages
  this.route('dashboard', {
    path: '/dashboard',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('tracker', {
    path: '/tracker',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
});