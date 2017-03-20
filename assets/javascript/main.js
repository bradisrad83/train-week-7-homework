$("document").ready(function() {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBZNwV21Wiqh6kv7LRC7OO8HsfYiu4Na2Y",
        authDomain: "trainscheule.firebaseapp.com",
        databaseURL: "https://trainscheule.firebaseio.com",
        storageBucket: "trainscheule.appspot.com",
        messagingSenderId: "575489165292"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function(event) {
        console.log("click function a go");
        event.preventDefault();
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();

        var trainData = {
            name: trainName,
            station: destination,
            firstTrain: firstTrainTime,
            hertz: frequency
        };

        database.ref().push(trainData);

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

    });



    database.ref().on("child_added", function(childSnapshot) {
        var trainInfo = {
            nameInfo: childSnapshot.val().name,
            stationInfo: childSnapshot.val().station,
            firstTrainInfo: childSnapshot.val().firstTrain,
            hzInfo: childSnapshot.val().hertz
        };

        var trainFrequency = trainInfo.hzInfo;
        var startingTrain = trainInfo.firstTrainInfo;

        var fixedTime = moment(startingTrain, "hh:mm").subtract(1, "years");

        var timeDifference = moment().diff(moment(fixedTime), "minutes");
        var timeRemaining = timeDifference % trainFrequency;

        var nextTrainTime = trainFrequency - timeRemaining;

        var nextTrain = moment().add(nextTrainTime, "minutes");
        var trainArrival = moment(nextTrain).format("hh:mm");



        $("#train-schedule> tbody").append("<tr><td>" + trainInfo.nameInfo + "</td><td>" + trainInfo.stationInfo + "</td><td>" +
            trainInfo.hzInfo + "</td><td>" + trainArrival + "</td><td>" + nextTrainTime);

    });
});
