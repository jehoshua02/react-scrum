var Reflux = require('reflux');
var Actions = require('../actions');
var State = require('./mixins/State');
var firebase = require('../util/firebase').child('requirements');


var RequirementStore = Reflux.createStore({
  mixins: [State],

  getInitialState: function () {
    return {
      requirements: []
    };
  },

  listenables: {
    save: Actions.REQUIREMENT_SAVE,
    sync: Actions.REQUIREMENT_SYNC
  },

  init: function () {
    firebase.on('value', Actions.REQUIREMENT_SYNC);
  },

  onSave: function (requirement) {
    firebase.push(requirement);
    this.setState({
      requirements: this.state.requirements.concat(requirement)
    });
  },

  onSync: function (snapshot) {
    var requirements = snapshot.val();
    if (!requirements) { return; }
    this.setState({
      requirements: requirements
    });
  }
});

RequirementStore.listen(function () {
  console.log(this.state);
});


module.exports = RequirementStore;
