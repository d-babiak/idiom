App.Views.SolutionsIndex = Backbone.View.extend({
  template: JST['solutions/index'],

  initialize: function(options) {
    //collection set here
    //listeners?
    this.category = options.category;
    this.listenTo(this.collection, 'sync add', this.render)
  },

  render: function() {
    // this comment doesn't exist
    var that = this;
    this.$el.html(this.template({category: this.category}));
    this.collection.each(function(solution) {
      var view = new App.Views.Solution({model: solution});
      that.$('.solution-list').append(view.render().$el);
    });
    return this;
  },

  events: {}

});
