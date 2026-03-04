// sokol data rcv korchi
const alldatacollect = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(rspns => rspns.json())
    .then(data => displayData(data.data));
}

alldatacollect();
// sokol data rcv


// level number unujai sobdartho collect korchi
const buttonPressKorlore = (nmbr) => {
 fetch(`https://openapi.programming-hero.com/api/level/${nmbr}`)
 .then(rspns => rspns.json())
 .then(words => displayWords(words.data));
}
// level number unujai sobdartho collect korchi


// all data collect korar por display korchi
const displayData = (datas) => {
    const buttongulo = document.getElementById('buttoner-somahar');
    buttongulo.innerHTML = "";
    datas.forEach(element => {
        const div = document.createElement('div');
        // button a onclick set kore dichi, jate click kora matroi lesson er wordmeaning gulo collect korte pari
        div.innerHTML = `
        <button onclick = buttonPressKorlore(${element.level_no}) class="btn btn-primary btn-outline" href=""><i class="fa-solid fa-book-open"></i>Lesson - ${element.level_no}</button>
        `;
    buttongulo.append(div);
    });
}
// all data collect korar por display korhci


// level unujai sobdartho collect korar por append korchi
const displayWords = (words) => {
    const Sobdartho = document.getElementById('vocabularies');
    Sobdartho.innerHTML = "";
    // sobdartho na pawa gele warning dewa
    if(words.length == 0){
            const div = document.createElement('div');
            div.classList.add("col-span-3");
            div.innerHTML = `
            <div class="flex flex-col items-center justify-center gap-3 py-9">
                    <img src="./assets/alert-error.png">
                    <p class="font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h1 class="font-bangla text-2xl font-bold">নেক্সট Lesson এ যান</h1>
                </div>
            `;
            Sobdartho.append(div);
            return;
        }
    // sobdarhto na pawa gele warning dewa

    // sobdartho pawa gele card akare add kore dibe
    words.forEach(elmnt => {
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white py-8 px-4 rounded-lg h-full">
                    <h1 class="flex justify-center font-bold text-xl">${elmnt.word ? elmnt.word: "শব্দ পাওয়া যায়নি!"}</h1>
                    <p class="flex justify-center my-3">Meaning /Pronounciation</p>
                    <h1 class="flex justify-center font-semibold text-xl font-bangla text-[#18181b80]">"${elmnt.meaning ? elmnt.meaning : "অর্থ খুজে পাওয়া যায়নি!"} / ${elmnt.pronunciation ? elmnt.pronunciation : "উচ্চারণ খুঁজে পাওয়া যায়নি!" }"</h1>
                    <div class="flex justify-between mt-8">
                        <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>      
        `;
    Sobdartho.append(card);
    });
    // sobdarhto pawa gele card akare add kore dibe
}
// level unujai sobdartho collect korar por appen korchi
