//var hacker = new Backbone.Model({
//    name: "<script>alert('xss')</script>",
//    title: "hi"
//});

//if (hacker.has("title"))
//    alert("ok");
//else alert("false");

//var Meal = Backbone.Model.extend({
//    idAttribute: "_id"
//});

//var cake = new Meal({ _id: 1, name: "Пирожок" });
//alert("id пирожка: " + cake.id);

//cake.set({ name: "Непиражок" });
//alert(cake.changedAttributes());

//var artist = new Backbone.Model({
//    firstName: "василий",
//    lastName: "Кандинский"
//});

//artist.set({ birthday: "December 16, 1966" });
//alert(JSON.stringify(artist));


//Backbone.sync = function (method, model) {
//    alert(method + ": " + JSON.stringify(model));
//    model.id = 1;
//};

//var book = new Backbone.Model({
//    title: "Малая Земля",
//    author: "Леонид Брежнев"
//});

//book.save();
//book.save({ author: "Леня" });



//$(function () {
//    var List = Backbone.Model.extend({
//        defaults: {
//            firstParagraph: "Загрузка",
//            secondParagraph: "Отображение",
//            thirdParagraph: "Завершение работы"
//        }
//    });

//    var list = new List();

//    var ListView = Backbone.View.extend({
//        el: $("body"),
//        template: _.template($("#list").html()),
//        initialize: function () {
//            this.render();
//        },
//        render: function () {
//            $(this.el).html(this.template(this.model.toJSON()));
//            return this;
//        }
//    });

//    var listView = new ListView({model: list});
//});




$(function () {
    var List = Backbone.Model.extend({
        defaults: {
            state: "start",
            firstParagraph: "",
            secondParagraph: "",
            thirdParagraph: ""
        }
    });

    var list = new List();

    var NumberOfModel = Backbone.Collection.extend({
        model: List,
    });

    var NumberList = new NumberOfModel([
        {
            firstParagraph: "Загрузка",
            secondParagraph: "Отображение",
            thirdParagraph: "Завершение работы"
        },
        {
            firstParagraph: "Завершение работы",
            secondParagraph: "Отображение",
            thirdParagraph: "Загрузка"
        },
        {
            firstParagraph: "Отображение",
            secondParagraph: "Загрузка",
            thirdParagraph: "Завершение работы"
        }
    ]);

    var Block = Backbone.View.extend({

        el: $("body"),

        templates: {
            "start": _.template($("#start").html()),
            "userAction": _.template($("#list").html())
        },

        events: { "click input:button": "check" },

        initialize: function () { this.render(); },

        check: function () {
            var index = this.$("input:text").val();
            var userModel = NumberList.at(index);
            this.model = userModel;
            this.model.set({ state: "userAction" });
            this.render();
        },

        render: function () {
            var state = this.model.get("state");
            $(this.el).html(this.templates[state](this.model.toJSON()));
            return this;
        }

    });

    var block = new Block({ model: list });

    list.trigger("change");
});