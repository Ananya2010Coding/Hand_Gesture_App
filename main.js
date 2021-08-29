prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="user_img" src="'+data_uri+'"/>';
    });
}

console.log("ml5-version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZCJlkbXY_/model.json", modelLoaded);

function modelLoaded(){
    console.log("MODEL LOADED!!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The Hand Gesture is:-"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("user_img");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if(results[0].label == 'Victory'){
            document.getElementById("emoji_img").innerHTML = '&#9996;';
        }
        if(results[0].label == 'Thumbs Up'){
            document.getElementById("emoji_img").innerHTML = '&#128077;';
        }
        if(results[0].label == 'Up'){
            document.getElementById("emoji_img").innerHTML = '&#128070;';
        }
    }
}