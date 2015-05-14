var ProjectsView = Backbone.Marionette.CollectionView.extend({
  childView: ProjectView,
  emptyView: EmptyView,
  className: 'list-group',

  templateHelpers: {
    msg: {
      no_projects: chrome.i18n.getMessage('no_projects')
    }
  },

  events: {
    'click a': 'onClick'
  },

  initialize: function() {
    App.intercom.onMessage.addListener(function(msg) {
      if (msg.type == 'projects.set') {
        if (this.collection) this.collection.reset(msg.data)
      }
    }.bind(this))

    this.fetchProjects()
  },

  fetchProjects: function() {
    App.intercom.postMessage({type: 'projects.get'})
  },

  onClick: function(event) {
    var info = event.currentTarget.querySelector('span[data-id]')
    var projectId = info.dataset.id

    Backbone.Events.trigger('show:project', projectId)
  },
})
