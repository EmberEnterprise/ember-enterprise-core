/* jshint node: true */
'use strict';
var path = require('path');
var fs = require('fs');
var Funnel = require('broccoli-funnel');

process.setMaxListeners(0);

module.exports = {
  name: 'ember-enterprise-core',
  included: function(app) {
    this._super.included(app);

    var useScss = app.options['emberEnterprise.useScss'];
    if (!useScss) {
      app.import(path.join('vendor/compiled_css/bootstrap-theme.css'));
      app.import(path.join('vendor/compiled_css/material-theme.css'));
    }

    var faPath = path.join(app.bowerDirectory, 'font-awesome');
    var fontsPath = path.join(faPath, 'fonts');

    // Import all files in the fonts folder when option not defined or enabled
    fs.readdirSync(fontsPath).forEach(function(fontFilename){
      app.import(
          path.join(fontsPath, fontFilename),
          { destDir:'/fonts' }
      );
    });

  },

  treeForVendor: function(tree) {
    var cssPath = 'node_modules/ember-enterprise-core/css';
    if (this.isDevelopingAddon()) {
      cssPath = 'css';
    }
    tree = new Funnel(cssPath, { destDir: 'compiled_css' });
    return this._super.treeForVendor.call(this, tree);
  }
};
