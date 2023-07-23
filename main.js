var prediction_1 = ""
var prediction_2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
})

camera = document.getElementById("camera")

Webcam.attach("#camera")

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='selfie' src='" + data_uri + "'/>"
    })
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model Loaded");
}

function check() {
    img = document.getElementById("selfie")
    classifier.classify(img, gotResult)
}

function gotResult(error,result){
    if(error){
        console.log(error)
    }

    else{
        console.log(result)

        document.getElementById("result_emotion_name").innerHTML= result[0].label
        document.getElementById("result_emotion_name2").innerHTML=result[1].label
        
        if(result[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }

        if(result[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;"
        }

        if(result[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;"
        }

        if(result[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;"
        }

        if(result[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;"
        }

        if(result[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;"
        }
    }
}