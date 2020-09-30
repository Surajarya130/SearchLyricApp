const myForm = document.getElementById("myForm");
const inputValue = document.getElementById("inputValue");
const singer = document.getElementById("singer");
const songName = document.querySelector("#songName");
const songLyric = document.getElementById("songLyric");
const getLyric = document.getElementById("getLyric")
const songLists = document.getElementById("songLists");
const resultAck = document.getElementById("resultAck");
const forBack = document.querySelector(".forBack");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn")
const secContainer = document.querySelector(".containerSecond")

const urlAPI = "https://api.lyrics.ovh"; 


function showLyricList(e){
    e.preventDefault();
    var searchStr = inputValue.value.trim();

    if(searchStr){
        // console.log(searchStr);
        findSong(searchStr);
    }else{
        alert("Must be flled");
    }


}


async function findSong(searchStr){
    
    //Method 2
    const res = await fetch(`${urlAPI}/suggest/${searchStr}`);
    const data = await res.json();
    showData(data);

}


function showData(rawData){

    resultAck.innerHTML="";
    // let output = "";
    // rawData.data.forEach(item => {
    //     output += `
                // <li><span id="singer">${item.artist.name}</span>
                //     <span class="" id="songName">${item.title}</span>
                //     <button class="" type="submit" id="getLyric" data-artist="${item.artist.name}"  data-song="${item.title}">Get Lyrics</button>
                // </li>
    //     ` 
    // })
    // songLists.innerHTML = `
    //     ${output}

    // `

    var i=0;

    songLists.innerHTML = `
    <ul id="songLists">
    ${rawData.data.map(item => `
        <li><span id="singer">${item.artist.name}</span>
        <span class="" id="songName">${item.title}</span>
        <button class="" type="submit" id="getLyric" btn-Id=${i++} data-artist="${item.artist.name}"  data-song="${item.title}">Get Lyrics</button>
        </li>`).join("")
    }
    </ul>
    `;


    if(rawData.prev || rawData.next){
        forBack.innerHTML = `
                            ${  
                                rawData.prev ? `<img class="prevBtn" onclick="getMoreSongs('${rawData.prev}')" 
                                src="https://img.icons8.com/android/96/000000/circled-chevron-right.png"/>` : "" 
                            }
                            ${
                                rawData.next ? `<img class="nextBtn" onclick="getMoreSongs('${rawData.next}')"
                                src="https://img.icons8.com/android/96/000000/circled-chevron-right.png"/>` : "" 
                            }
                            `
    }else{
        forBack.innerHTML=""; 
    }

}

async function getLyrics(lyricSinger, lyricSong){
    const res = await fetch(`${urlAPI}/v1/${lyricSinger}/${lyricSong}`)
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');


    secContainer.innerHTML = `<h4><strong>${lyricSinger}</strong> - </h4><p>${lyricSong}</p>
    <span>${lyrics}</span>`;
  
    resultAck.innerHTML = '';
    forBack.innerHTML = "";
}


secContainer.addEventListener('click', e => {
    const clickedEl = e.target;
  
    if (clickedEl.tagName === 'BUTTON') {
      const artist = clickedEl.getAttribute('data-artist');
      const songTitle = clickedEl.getAttribute('data-song');

      getLyrics(artist, songTitle);
    }
  });


// Get prev and next songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
  
    showData(data);
  }





myForm.addEventListener("submit", showLyricList);


