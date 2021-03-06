/* global App, JST*/
App.Views.ProblemsShowView = Backbone.View.extend({
  template: JST['problems/show'],

  events: {
    'click button.submit': 'submit',
    'click button.show-solutions': 'fetchSolutions',
    'click button.close': 'close'
  },

  render: function() {
    var content = this.template({problem: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    $('#response-message').text('');
    $('.spinner').toggle()
    var content = App.editor.getValue();
    this.$('#solution').val(content);
    var params = this.$('form').serializeJSON();
    var newSoln = new App.Models.Solution(params['solution']);
    newSoln.save({}, {
      success: function(response) {
        setTimeout(function() {
          $('#response-message').text('Success!');
        }, 900)
        $('.spinner').toggle(1000)
      },
      error: function(response) {
        var errorMsg = "Error! " + arguments[1].responseJSON.message
        setTimeout(function() {
          $('#response-message').text(errorMsg);
        }, 900)
        $('.spinner').toggle(1000)
      }
    });
  },

  fetchSolutions: function(event) {
    event.preventDefault();
    $('#response-message').text('');
    $('.spinner').toggle()
    //Give this a callback to determine when to start a transition
    this.model.fetchSolutions(this.insertSolutions.bind(this));
    //pop in a modal.
  },

  close: function() {
    event.preventDefault();
    $('#response-message').text('');
    $('.spinner').css('display', 'none');
  },

  insertSolutions: function(solutions) {
    this.$('.spinner').toggle(1000)
    $solutions = this.$('#response-message');
    solutions.forEach(function(solution) {
      var view = new App.Views.SolutionView({model: solution});
      $solutions.append(view.render().$el);
    })
  }

});
