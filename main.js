img = "";
stat = "";
objects = [];
song = "";
function preload()
{
    song = loadSound("emergency_alert.mp3");
}
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    od = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Objects are being detected";

}
function modelLoaded()
{
    console.log("model has been loaded")
    stat = true;
    od.detect(video,gotResults);
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error)
    }
    console.log(results)
    objects = results;
}
function draw()
{
    image(video,0,0,380,380);

    
    if(stat !='')
    {
        r = random(255);
        g = random(255); 
        b = random(255);
        fill(r,g,b);
        stroke(r,g,b);
        for(var i = 0;i<objects.length;i++)
        {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("ns").innerHTML = "Number of objects detected : "+objects.length;
        per = floor(objects[i].confidence * 100);
        text(objects[i].label + " "+per+"%",objects[i].x+15,objects[i].y+15);
        noFill()
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label = "person")
        {
            document.getElementById("nsa").innerHTML = "Baby Detected";
            song.stop()
        }
        else
        {
            document.getElementById("nsa").innerHTML = "Baby not detected";
            song.play();
        }
        }
        
    }


}

