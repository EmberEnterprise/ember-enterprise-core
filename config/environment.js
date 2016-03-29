/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  var ENV = {
    emberEnterprise: {
      useCoreThemes: true,
      defaultTheme: 'bootstrap',
      additionalThemes: [],
      includePaths: [],
      useFontAwesome: true,
    }
  };
  return ENV;
};
