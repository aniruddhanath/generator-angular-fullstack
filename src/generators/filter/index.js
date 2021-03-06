'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.Base.extend({
  compose: function() {
    this.composeWith('ng-component:filter', {arguments: this.arguments}, { local: require.resolve('generator-ng-component/generators/filter') });
  }
});

module.exports = Generator;
