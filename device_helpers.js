if (typeof Handlebars !== 'undefined') {
  /*
   * Template Rendering Shortcut
   */
  Handlebars.registerHelper('deviceRender', function(name, options) {
    if (! _.isString(name)) {
      // If meteor-router is installed, no passed name will load Meteor.Router.page()
      if (typeof Meteor.Router !== 'undefined') {
        name = Meteor.Router.page();
      } else {
        name = '';
      }
    }

    var device_type = Meteor.Device.type();
    var suffix = Meteor.Device.getSuffix(device_type);

    var device_name = name + (suffix || '');

    console.log(name);
    console.log(device_name);

    if (Template[device_name]) {
      // Try to load the suffixed template
      return new Handlebars.SafeString(Template[device_name]());
    } else if (Template[name]) {
      // Fallback to unsuffixed template if suffixed template doesn't exist
      return new Handlebars.SafeString(Template[name]());
    }
  });
  
  /*
   * Device Type Helpers
   */
  Handlebars.registerHelper('isTV', Meteor.Device.isTV);
  Handlebars.registerHelper('isTablet', Meteor.Device.isTablet);
  Handlebars.registerHelper('isPhone', Meteor.Device.isPhone);
  Handlebars.registerHelper('isDesktop', Meteor.Device.isDesktop);
  Handlebars.registerHelper('isBot', Meteor.Device.isBot);

  Handlebars.registerHelper('device_type', Meteor.Device.type);
}
