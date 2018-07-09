console.log("poo")



$(document).ready(function () {
    var dbRefObject = firebase.database().ref();

    var dbRefList = dbRefObject.child("Trains")
    // var dbRefList = dbRefObject.child("Trains").child("Train"+i);
    // dbRefObject.on("value", snap => {
    //     console.log(snap.val());
    // });

    dbRefList.on("value", gotData);

    function gotData(snap) {
        var targetDiv = $("#targetDiv")
        document.getElementById("targetDiv").innerHTML = ""
        var trainData = snap.val();
        var keys = Object.keys(trainData);
        console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            var targetDiv = $("#targetDiv")
            var k = keys[i];
            var destinationT = trainData[k].Destination;
            var freqT = trainData[k].Frequency;
            var fttT = trainData[k].FirstTrainTime;
            var trainNameT = trainData[k].TrainName;
            console.log(destinationT, freqT, fttT, trainNameT);

            var minsNow = moment().minute()
            var hoursNow = moment().hours()

            var currentHours = hoursNow
            var currentMins = minsNow

            var currentTotalMins = ((currentHours * 60) + currentMins)
            console.log("Current total mins: " + currentTotalMins)

            var trainStartTime = fttT
            var freq = freqT

            var timeArr = trainStartTime.split(":")
            var hoursString = timeArr[0]
            var minsString = timeArr[1]
            var hours = parseInt(hoursString, 10)
            var mins = parseInt(minsString, 10)
            var totalStartMins = ((hours * 60) + mins)
            console.log("Total start mins: " + totalStartMins)

            var timePassed = (currentTotalMins - totalStartMins);
            console.log("Time Passed: " + timePassed)

            var numberOfTimesTrainHasRun = (timePassed / freq)
            console.log("theoreticals number of times train has run: " + numberOfTimesTrainHasRun)
            var freqString = numberOfTimesTrainHasRun.toString()
            var freqArr = freqString.split(".")

            var actualTrainRuns = freqArr[0];
            var remTrainRuns = freqArr[1];
            console.log("actual number of times the train has run: " + actualTrainRuns)
            console.log("remainder to calculate mins till next train: " + remTrainRuns)

            var numOfNextTrain = parseInt(actualTrainRuns) + 1
            console.log("number of the next train: " + numOfNextTrain)

            var minsFromMNOfNextTrain = ((numOfNextTrain * freq) + totalStartMins)
            console.log("mins from midnight of the next train: " + minsFromMNOfNextTrain)

            var minsUntilNextTrain = (minsFromMNOfNextTrain - currentTotalMins)

            // if (minsUntilNextTrain == null){
            //     minsUntilNextTrain = "00"
            // }
            console.log("Mins until the next train: " + minsUntilNextTrain)

            // convert mins from midnight of next trin into a time
            var nextTrainInHours = (minsFromMNOfNextTrain / 60)
            var nextTrainInHoursString = nextTrainInHours.toString()
            console.log("Next Train Hours in string: " + nextTrainInHoursString)
            var nextTrainArr = nextTrainInHoursString.split(".")
            var nextTrainHours = nextTrainArr[0]
            var nextTrainRem = nextTrainArr[1]
            var nextTrainRemDec = "." + nextTrainRem
            console.log("Next train rem: " + nextTrainRemDec)


            // console.log("next train mins : " + nextTrainMins)

            if (nextTrainRem == null) {
                var nextTrainMins = "00";
                // console.log("Next Train time: "+ nextTrainHours + ":" + nextTrainMins)
            } else {
                // var nextTrainRemInt = parseInt(nextTrainRemDec)
                var nextTrainMinsRaw = (nextTrainRemDec * 60)
                var nextTrainMins = Math.round(nextTrainMinsRaw)
                var nextTrainMinsString = nextTrainMins.toString()
                var secondNumString = nextTrainMinsString.charAt(1)
                // console.log(secondNumString)
                if (secondNumString == null) {
                    nextTrainMinsString.concat("0")
                    console.log("shit")

                }
                // console.log("Next Train time: "+ nextTrainHours + ":" + nextTrainMins)
            }

            console.log("Next Train time: " + nextTrainHours + ":" + nextTrainMins)
            var newThread = $("<tr>")
            var newtd1 = $("<td>")
            var newtd2 = $("<td>")
            var newtd3 = $("<td>")
            var newtd4 = $("<td>")
            var newtd5 = $("<td>")
            $(newtd1).text(trainNameT)
            $(newtd2).text(destinationT)
            $(newtd3).text(freqT)
            $(newtd4).text(nextTrainHours + ":" + nextTrainMins)
            $(newtd5).text(minsUntilNextTrain)
            $(newThread).append(newtd1, newtd2, newtd3,newtd4,newtd5)
            $(targetDiv).append(newThread)
        }

    }

    $(".btn").on("click", function () {
        // pull current time using moment. js
        event.preventDefault()
        // calculate current time in minutes since midnight

        var minsNow = moment().minute()
        var hoursNow = moment().hours()

        var currentHours = hoursNow
        var currentMins = minsNow

        var currentTotalMins = ((currentHours * 60) + currentMins)
        console.log("Current total mins: " + currentTotalMins)

        var name = $("#InputTrain1").val().trim()
        var destination = $("#InputDestination1").val().trim()
        var trainStartTime = $("#InputTrainTime1").val().trim()
        var freq = $("#InputFrequency1").val().trim()

        var timeArr = trainStartTime.split(":")
        var hoursString = timeArr[0]
        var minsString = timeArr[1]
        var hours = parseInt(hoursString, 10)
        var mins = parseInt(minsString, 10)
        var totalStartMins = ((hours * 60) + mins)
        console.log("Total start mins: " + totalStartMins)

        var timePassed = (currentTotalMins - totalStartMins);
        console.log("Time Passed: " + timePassed)

        var numberOfTimesTrainHasRun = (timePassed / freq)
        console.log("theoreticals number of times train has run: " + numberOfTimesTrainHasRun)
        var freqString = numberOfTimesTrainHasRun.toString()
        var freqArr = freqString.split(".")

        var actualTrainRuns = freqArr[0];
        var remTrainRuns = freqArr[1];
        console.log("actual number of times the train has run: " + actualTrainRuns)
        console.log("remainder to calculate mins till next train: " + remTrainRuns)

        var numOfNextTrain = parseInt(actualTrainRuns) + 1
        console.log("number of the next train: " + numOfNextTrain)

        var minsFromMNOfNextTrain = ((numOfNextTrain * freq) + totalStartMins)
        console.log("mins from midnight of the next train: " + minsFromMNOfNextTrain)

        var minsUntilNextTrain = (minsFromMNOfNextTrain - currentTotalMins)

        // if (minsUntilNextTrain == null){
        //     minsUntilNextTrain = "00"
        // }
        console.log("Mins until the next train: " + minsUntilNextTrain)

        // convert mins from midnight of next trin into a time
        var nextTrainInHours = (minsFromMNOfNextTrain / 60)
        var nextTrainInHoursString = nextTrainInHours.toString()
        console.log("Next Train Hours in string: " + nextTrainInHoursString)
        var nextTrainArr = nextTrainInHoursString.split(".")
        var nextTrainHours = nextTrainArr[0]
        var nextTrainRem = nextTrainArr[1]
        var nextTrainRemDec = "." + nextTrainRem
        console.log("Next train rem: " + nextTrainRemDec)


        // console.log("next train mins : " + nextTrainMins)

        if (nextTrainRem == null) {
            var nextTrainMins = "00";
            // console.log("Next Train time: "+ nextTrainHours + ":" + nextTrainMins)
        } else {
            // var nextTrainRemInt = parseInt(nextTrainRemDec)
            var nextTrainMinsRaw = (nextTrainRemDec * 60)
            var nextTrainMins = Math.round(nextTrainMinsRaw)
            var nextTrainMinsString = nextTrainMins.toString()
            var secondNumString = nextTrainMinsString.charAt(1)
            // console.log(secondNumString)
            if (secondNumString == null) {
                nextTrainMinsString.concat("0")
                console.log("shit")

            }
            // console.log("Next Train time: "+ nextTrainHours + ":" + nextTrainMins)
        }

        console.log("Next Train time: " + nextTrainHours + ":" + nextTrainMins)


        var newTrain = {
            TrainName: name,
            Destination: destination,
            FirstTrainTime: trainStartTime,
            Frequency: freq,
        };

        // Uploads employee data to the database
          dbRefList.push(newTrain);

    });
});