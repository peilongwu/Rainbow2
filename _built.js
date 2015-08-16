({
    baseUrl: "./src",
    paths:{
      'underscore': '../js/vendor/underscore-min',
      'backbone': '../js/vendor/backbone-min',
      'moment': '../js/vendor/moment.min',
      'select2': '../js/vendor/select2-4.0.0/js/select2.full.min',
      'jquery': 'empty:',
      'jquery-plus': "../js/vendor/jquery",
      'bootstrap':'../assets/bootstrap/js/bootstrap.amd',
      'es5':'../js/vendor/es5-shim.min',
      'json':'../js/vendor/json',
      'store':'../js/vendor/store+json2.min',
      'template': 'templates/site',
      'text': '../js/vendor/requirejs/text',
      'action': '../js/action'
    },
    name: "rainbow",
    out: "dist/js/rainbow.js"
})