// Initialize Firebase
var config = {
    apiKey: "AIzaSyDO9pFmvujjzEF2mtjz2WXnQKokPnBrBbI",
    authDomain: "exercise-c1dc5.firebaseapp.com",
    databaseURL: "https://exercise-c1dc5.firebaseio.com",
    projectId: "exercise-c1dc5",
    storageBucket: "exercise-c1dc5.appspot.com",
    messagingSenderId: "842990990716"
};
firebase.initializeApp(config);
const db = firebase.database();

$("#submit-train").on("click", function(event) {
    function train(name, destination, time, frequency) {
        this.name = name;
        this.destination = destination;
        this.time = time;
        this.frequency = frequency;
    }
    var pushMe = new train($("#train-name").val().trim(), $("#train-destination").val().trim(), $("#train-time").val().trim(), $("#train-frequency").val().trim());
    db.ref('trains').push(pushMe);
});

//TODO finish this after JS.Moment
db.ref("trains").on("child_added", function(childSnapshot) {
    var frequency = childSnapshot.val().frequency;
    var startTime = childSnapshot.val().time;
    var currentTime = moment();

    //Push back a year
    var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    console.log("starting time: " + startTime);
    var newRow = $("<tr>");
    newRow.append($("<td>").text(childSnapshot.val().name))
        .append($("<td>").text(childSnapshot.val().destination))
        .append($("<td>").text(frequency))
        .append($("<td>").text(moment(nextTrain).format("h:mm a")))
        .append($("<td>").text(tMinutesTillTrain));
    //.append($("<td>").text())
    $(".table").append(newRow);
});
