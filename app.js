// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZ3qPO3YoXEqZRIL1KKvupnsizuZcEvDQ",
  authDomain: "marknotes-jbakse.firebaseapp.com",
  databaseURL: "https://marknotes-jbakse.firebaseio.com",
  projectId: "marknotes-jbakse",
  storageBucket: "marknotes-jbakse.appspot.com",
  messagingSenderId: "307129956026"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const notes = db.collection("notes");
console.log("notes", notes);
console.log("notes-sorted", notes.orderBy("score"));

//https://alligator.io/vuejs/vue-cloud-firestore/
Vue.use(VueFirestore);

var app = new Vue({
  // element to mount to
  el: "#app",
  // initial data
  data: {
    notes: {
      title: "untitled",
      body: "empty"
    },
    newNote: ""
  },

  firestore: () => {
    console.log("firestore");
    return { notes: notes.orderBy("score", "desc") };
  },
  // computed property for form validation state
  computed: {},
  watch: {
    notes: () => {
      console.log("value");
    }
  },
  // methods
  methods: {
    addNote: function() {
      console.log("hi");
      var value = this.newNote && this.newNote.trim();
      if (!value) {
        return;
      }
      //this.$firestore.
      notes.add({
        title: value,
        score: 0
      });
      this.newNote = "";
    },
    upVote: function(note) {
      console.log(notes);
      //this.$firestore.
      notes.doc(note[".key"]).update({
        score: (note.score || 0) + 1
      });
    },
    downVote: function(note) {
      //this.$firestore.
      notes.doc(note[".key"]).update({
        score: (note.score || 0) - 1
      });
    },
    remove: function(note) {
      notes.doc(note[".key"]).delete();
    }
  }
});
