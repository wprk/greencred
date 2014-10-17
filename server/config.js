// Hacky fix to keepalive error v.0.9.4
process.argv = _.without(process.argv, '--keepalive');
Meteor.startup(function () { console.log("LISTENING"); });

// Enable to debug schemas
SimpleSchema.debug = true

Meteor.startup(function () {
  process.env.MAIL_URL="smtp://wprk14%40gmail.com:peterGRUBB14!!@smtp.gmail.com:465/";
  
  var siteName = 'Site Name';
  var siteDomain = 'domainname.co.uk';
  
  Accounts.emailTemplates.siteName = siteName;
  Accounts.emailTemplates.from = siteName + " Admin <noreply@" + siteDomain + ">";
  Accounts.emailTemplates.verifyEmail = {
    subject: function(user) {
      return user.profile.name + ", Welcome to " + siteName;
    },
    text: function (user, url) {
     return "Hello " + user.profile.name + ", \n\n"
       + "Thank you for registering with " + siteName + ". To activate your account, simply click the link below:\n\n"
       + url + "\n\n"
       + "Thanks, \n\n"
       + "The " + siteName + " Team";
    }
  };
  
  enviroment = process.env.NODE_ENV;

  Accounts.config({
    sendVerificationEmail: true,
    loginExpirationInDays: 1
  });  
  
  try {
    if (enviroment == 'production') {
      ServiceConfiguration.configurations.remove({
        service: "facebook"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "facebook",
        "appId" : "269805096526069",
        "secret" : "d5f20aad201ef0c2043713c92120b638"
      });
      ServiceConfiguration.configurations.remove({
        service: "twitter"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "twitter",
        "consumerKey" : "p7UzoNxKFqBLXIPVP7GsDxabD",
        "secret" : "9jl8uSBRkuIjnxw6ivISN6NQbGZTMfMit1geCB6dXAV5X0PMz6"
      });
      ServiceConfiguration.configurations.remove({
        service: "google"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "google",
        "clientId" : "181059737409-5cfcr237ab8flcbgeq0d0kesp701m7uk.apps.googleusercontent.com",
        "secret" : "20Rj2qOgSbcQF69qVOPxrFsA"
      });
      ServiceConfiguration.configurations.remove({
        service: "github"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "github",
        "clientId" : "c7cc0e8ab2f70afc1305",
        "secret" : "a16904f0ef41cdae16183b035458da7b96541dbf"
      });
    } else {
      ServiceConfiguration.configurations.remove({
        service: "facebook"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "facebook",
        "appId" : "292648167575095",
        "secret" : "3e250bc62928b50a7f33377cb2db591f"
      });
      ServiceConfiguration.configurations.remove({
        service: "twitter"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "twitter",
        "consumerKey" : "p7UzoNxKFqBLXIPVP7GsDxabD",
        "secret" : "9jl8uSBRkuIjnxw6ivISN6NQbGZTMfMit1geCB6dXAV5X0PMz6"
      });
      ServiceConfiguration.configurations.remove({
        service: "google"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "google",
        "clientId" : "181059737409-4ljduubsrrimbifgcbhj1ti93l6600ai.apps.googleusercontent.com",
        "secret" : "7W5D5pbsh7euajSJRaw3mWhM"
      });
      ServiceConfiguration.configurations.remove({
        service: "github"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "github",
        "clientId" : "18eca7f55e5118c8c2c0",
        "secret" : "fd7e6626512861b84979ff99794da1fdf3ca3f41"
      });
    }
  } catch(error) {
    console.log(error.message);
  }
});

// Required for natestrauser:font-awesome package if browser-policy package is installed
// BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');