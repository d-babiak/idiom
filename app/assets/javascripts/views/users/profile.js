
App.Views.ProfileView = Backbone.View.extend({
  template: JST['users/profile'],

  className: 'col-xs-offset-3',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click toggle-list': 'toggleList'
  },

  render: function() {
    // this.$el.hide();
    var content = this.template({user: this.model});
    this.$el.html(content);
    // this.$el.fadeIn(600);
    return this;
  },

  attachOwnSolutions: function() {
    var that = this;
    App.Models.Problem.categories.forEach(function(cat){
      var solutions = that.categorySolutions(that.model.ownSolutions(), cat);
      solutions.comparator = 'rating';
      var view = new App.Views.SolutionsIndex({
        collection: solutions,
        includeProblemLink: true,
        includeCommentChain: false,
        removeSubmitter: true,
        category: cat
      });
      that.$('.own-solutions').append(view.render().$el);
    });
  },

  toggleList: function(event) {},

  categorySolutions: function(solutions, cat) {
    return new App.Collections.Solutions(solutions.where({category: cat}), {});
  },

  events: {
    'click a.choose-category': 'setCategory',
    'click a.choose-submitter-type': 'setSubmitterType'
  },

  attachSolutionList: function(event) {
    event.preventDefault();
    if (this.category && this.selectedSolutions) {
      var solutions = this.categorySolutions(this.selectedSolutions, this.category);
      solutions.comparator = 'rating';
      var view = new App.Views.SolutionsIndex({
        collection: solutions,
        includeProblemLink: true,
        includeCommentChain: false,
        remvoeSubmitter: true
      });
      debugger;
      this.swapSolutionList(view);
    }
  },

  setCategory: function(event) {
    debugger;
    event.preventDefault();
    this.category = event.currentTarget.text;
    this.attachSolutionList(event);
  },

  setSubmitterType: function(event) {
    debugger;
    event.preventDefault();
    if (event.currentTarget.text === 'own solutions') {
      this.selectedSolutions = this.model.ownSolutions();
    } else {
      this.selectedSolutions = this.model.likedSolutions();
    }
    this.attachSolutionList(event);
  },

  swapSolutionList: function(view) {
    if (this.currentList) { this.currentList.remove(); }
    this.currentList = view;
    this.$('#solution-list').append(view.render().$el);
  }

});
