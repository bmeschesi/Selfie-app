//for geolocation use navitagor.geolocation more info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator

//impotant: This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.


//setup id a function from P5.js
function setup() {
    //p5 stuff------
    noCanvas(); //P5 auto create a canvas
    const video = createCapture(VIDEO);
    video.size(160, 120)


    //lat and lon stuff------
    let initLat;
    let initLon;
    let image;

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    async function success(position) {
        initLat = position.coords.latitude;
        initLon = position.coords.longitude;
        nickname = document.getElementById('nickname').value;
        video.loadPixels();
        image = video.canvas.toDataURL();

        //setting coordinates values to html------
        document.getElementById('latitude').textContent = initLat;
        document.getElementById('longitude').textContent = initLon;

        //sending info to server-----
        const data = { initLat, initLon, nickname, image };
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        //server console.log info and send back to client
        const response = await fetch('/api', option);
        const json = await response.json();
        console.log(json)

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            status.textContent = 'Geolocation is not supported by your browser';
        }
    }

    const button = document.getElementById('submit');
    button.addEventListener("click", getLocation);
    
}