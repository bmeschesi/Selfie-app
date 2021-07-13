getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('div',"class='root'");
        root.classList.add('root');
        const nickname = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');
        image.classList.add('imagePrint');

        nickname.textContent = `Nickname: ${item.nickname}`;
        geo.textContent = `Lat: ${item.initLat}, Long: ${item.initLon}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image;
        image.alt = "Selfies from users"

        root.append(nickname, geo, date, image);
        document.body.append(root);
    }
//use p5.js to work with images more info: https://p5js.org/get-started/
//CDN link https://cdnjs.com/libraries/p5.js
}