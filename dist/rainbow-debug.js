define("keelkit/rainbow/1.0.0/rainbow-debug", [ "./base/app-debug", "cookie-debug", "./common/sign-debug", "json-debug" ], function(require) {
    var app = require("./base/app-debug");
    require("json-debug");
    if (!app.sign.isIn()) {
        app.route("signin", {
            trigger: true
        });
    } else {}
});

define("keelkit/rainbow/1.0.0/base/app-debug", [ "cookie-debug", "keelkit/rainbow/1.0.0/common/sign-debug" ], function(require) {
    var template = require("/assets/Rainbow/templates/site/desktop-debug.html");
    $("body").append(template);
    var app = {};
    rainbow = app;
    app.cookie = require("cookie-debug");
    _.extend(app, Backbone.Events);
    //窗口尺寸
    app.window = {};
    $(window).on("resize", $.proxy(this, function() {
        app.window = {
            height: $(window).innerHeight(),
            width: $(window).innerWidth()
        };
    }));
    app.alert = function(msg) {
        alert(msg);
    };
    app.confirm = function(msg) {
        return confirm(msg);
    };
    app.sign = require("keelkit/rainbow/1.0.0/common/sign-debug");
    var Router = Backbone.Router.extend({
        routes: {
            "!signin": "signin",
            "!*path": "nav"
        },
        nav: function(path) {
            app.alert(path);
        },
        search: function(query, page) {
            app.alert("search" + query + page);
        },
        signin: function() {
            app.sign.login();
        }
    });
    app.router = new Router();
    app.route = function(name, options) {
        name = name ? "!" + name : "";
        return app.router.navigate(name, options);
    };
    var login = function() {
        app.sign.login();
    };
    Backbone.history.start();
    //视图容器
    app.views = {};
    app.coms = {};
    //当前视图对象
    app.current;
    return app;
});

define("keelkit/rainbow/1.0.0/common/sign-debug", [], function(require) {
    var $box = $($("#tpl-login").html()).appendTo("body").hide();
    $box.on("click", ".btn-success", function() {
        rainbow.cookie.set("status", 1);
        $box.fadeOut();
        rainbow.route("");
        return false;
    });
    $("#J-signout").on("click", function() {
        if (rainbow.confirm("确定要退出当前登录的账号？")) {
            sign.logout();
            rainbow.route("signin", {
                trigger: true
            });
        }
    });
    var sign = {
        login: function() {
            $box.fadeIn();
        },
        logout: function() {
            rainbow.cookie.remove("status");
        },
        isIn: function() {
            return rainbow.cookie.get("status");
        }
    };
    return sign;
});
