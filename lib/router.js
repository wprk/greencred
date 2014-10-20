Router.map(function() {
  
  // Non Login Pages
  this.route('home', {
    path: '/',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('contact', {
    path: '/contact',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('about', {
    path: '/about',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('termsOfService', {
    path: '/terms-of-service',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('privacyPolicy', {
    path: '/privacy-policy',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('sitemap', {
    path: '/sitemap',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  
  // Auth Pages
  this.route('login', {
    path: '/auth/login',                 
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('registration', {
    path: '/auth/registration',                 
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('forgotPassword', {
    path: '/auth/forgot-password',                 
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('resetPassword', {
    path: '/auth/reset-password',                 
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
  this.route('accountSettings', {
    path: '/auth/account-settings',
    layoutTemplate: 'pageLayout',
    yieldTemplates: {
      'noSidebarLeft': {to: 'sidebarLeft'}
    }
  });
});