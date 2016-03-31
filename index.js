/* jshint node: true */
'use strict';
var path = require('path');
var fs = require('fs');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-enterprise-core',
  included: function(app) {
    this._super.included(app);

    var useScss = app.options['emberEnterprise.useScss'];
    //const defaultTheme = app.options['emberEnterprise.defaultTheme'] || 'bootstrap';
    if (!useScss) {
      // TODO: how to compile css in seperate theme files?
      //app.import(path.join(app.bowerDirectory, 'ember-enterprise-component/dist/css/bootstrap.css'));
      console.log('!!!!');
      //console.log(app);
      //console.log(Object.keys(app));
      console.log(app.project.nodeModulesPath);
      app.import(path.join('app/styles/dist/bootstrap-theme.css'));
      app.import(path.join('app/styles/dist/material-theme.css'));
      //app.import(path.join(app.project.nodeModulesPath, 'ember-enterprise-core/dist/bootstrap-theme.css'));
    }

    console.log('!!!!!!!!!!!!!!!!!!!!!!!');
    var faPath = path.join(app.bowerDirectory, 'font-awesome');
    var fontsPath = path.join(faPath, 'fonts');

    // Import all files in the fonts folder when option not defined or enabled
    // if (!('includeFontFiles' in options) || options.includeFontFiles) {
    console.log('********',fontsPath);
    fs.readdirSync(fontsPath).forEach(function(fontFilename){
      app.import(
          path.join(fontsPath, fontFilename),
          { destDir:'/fonts' }
      );
    });
    // }

  },

  treeForVendor: function(tree) {
    console.log('11111111111');
    tree = new Funnel(tree, { include: [ /css/ ] });
    return this._super.treeForAddon.call(this, tree);
  }
};
