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
        div.innerHTML = `
        <button onclick = buttonPressKorlore(${element.level_no}) class="btn btn-primary btn-outline" href=""><i class="fa-solid fa-book-open"></i>Lession - ${element.level_no}</button>
        `;
    buttongulo.append(div);
    });
}
// all data collect korar por display korhci


// level unujai sobdartho collect korar por append korchi
const displayWords = (words) => {
    const Sobdartho = document.getElementById('vocabularies');
    Sobdartho.innerHTML = "";
    words.forEach(elmnt => {
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white py-8 px-4 rounded-lg h-full">
                    <h1 class="flex justify-center font-bold text-xl">${elmnt.word ? elmnt.word: "শব্দ পাওয়া যায়নি!"}</h1>
                    <p class="flex justify-center my-3">Meaning /Pronounciation</p>
                    <h1 class="flex justify-center font-semibold text-2xl font-bangla text-[#18181b80]">"${elmnt.meaning ? elmnt.meaning : "অর্থ খুজে পাওয়া যায়নি!"} / ${elmnt.pronunciation ? elmnt.pronunciation : "উচ্চারণ খুঁজে পাওয়া যায়নি!" }"</h1>
                    <div class="flex justify-between mt-8">
                        <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>      
        `;
    Sobdartho.append(card);
    });
}
// level unujai sobdartho collect korar por appen korchi
