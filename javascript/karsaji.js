// sokol data rcv korchi
const alldatacollect = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(rspns => rspns.json())
    .then(data => displayData(data.data));
}

alldatacollect();
// sokol data rcv


// level number unujai sobdartho collect korchi
const buttonPressKorlore = (nmbr,mew) => {
    // button er focus dhore rakhar jonno mew te this keyword diye buttoner referenc nichi then setake dhore class add korchi.. ar queryselectorall diye node list a travle kore sobulote class remove kore dichi
 document.querySelectorAll('.lessons').forEach(elmnt => {elmnt.classList.remove("bg-blue-800", "text-white")});
 mew.classList.add("bg-blue-800", "text-white");

 fetch(`https://openapi.programming-hero.com/api/level/${nmbr}`)
 .then(rspns => rspns.json())
 .then(words => displayWords(words.data));
}
// level number unujai sobdartho collect korchi


// word meaning er details collect kora
const pressDetails = (idNmbr) => {
    fetch(`https://openapi.programming-hero.com/api/word/${idNmbr}`)
    .then(rspns => rspns.json())
    .then(details => showMeanigDetails(details.data))
}
// word meaning er details collect korchi


// modal close korar function
const closeModal = () => {
    const modal = document.getElementById('meaning-modal');
    modal.innerHTML = "";
}
// modal close koral funciton


// voice add korechi..
function pressVoice(word) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
// voice add kora hoyeche



// all data collect korar por display korchi
const displayData = (datas) => {
    const buttongulo = document.getElementById('buttoner-somahar');
    buttongulo.innerHTML = "";
    datas.forEach(element => {
        const div = document.createElement('div');
        // button a onclick set kore dichi, jate click kora matroi lesson er wordmeaning gulo collect korte pari
        div.innerHTML = `
        <button onclick = "buttonPressKorlore(${element.level_no},this)" class="btn btn-primary btn-outline lessons" href=""><i class="fa-solid fa-book-open"></i>Lesson - ${element.level_no}</button>
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
                        <button onclick = "pressDetails(${elmnt.id})" class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick = "pressVoice('${elmnt.word}')" class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>      
        `;
    Sobdartho.append(card);
    });
    // sobdarhto pawa gele card akare add kore dibe
}
// level unujai sobdartho collect korar por appen korchi



// details take modal akare show kora
const showMeanigDetails = (details) => {
    const modal = document.getElementById('meaning-modal');
    modal.innerHTML = "";
        const div = document.createElement('div');
        div.classList.add("fixed", "inset-0", "bg-black/50", "flex", "items-center", "justify-center", "z-[100]")
        div.innerHTML = `
        <div class="bg-white rounded-3xl p-12 flex flex-col items-start text-center w-full max-w-xl shadow-2xl mx-4">

            <h2 class="text-2xl font-bold mb-6 text-[#111111]">${details.word?details.word:`<p class="font-bangla text-red-400 font-normal">কোনো শব্দ খুঁজে পাওয়া যায়নি!<p>`} (<i class="fa-solid fa-microphone"></i>: ${details.pronunciation?details.pronunciation:`<p class="font-bangla text-red-400 font-normal">কোনো উচ্চারণ খুঁজে পাওয়া যায়নি!<p>`})</h2>

            <h3 class="text-base font-medium text-[#111111] mb-2">Meaning</h3>

            <p class="text-gray-500 text-lg font-medium mb-2 font-bangla">${details.meaning?details.meaning:`<p class="font-bangla text-red-400 font-normal">কোনো অর্থ খুঁজে পাওয়া যায়নি!<p>`}</p>

            <h3 class="text-base font-medium text-[#111111] mb-2">Example</h3>

            <p class="text-gray-500 text-base font-medium mb-4">${details.sentence?details.sentence:`<p class="font-bangla text-red-400 font-normal">কোনো বাক্য খুঁজে পাওয়া যায়নি!<p>`}</p>

            <h2 class="text-black text-lg font-medium mb-2 font-bangla">সমার্থক শব্দগুলো</h2>

            <ul class="space-x-2">
            ${details.synonyms.length != 0?
                details.synonyms.map(synnm => `<li onclick = "pressVoice('${synnm}')" class="btn font-normal">${synnm}</li>`).join("")
                :
                `<p class="font-bangla text-red-400 font-normal">কোনো সমার্থক শব্দ খুঁজে পাওয়া যায়নি!<p>`
              }
            </ul>

            <button id="close-modal-btn" onclick = "closeModal()"
                class="px-10 py-4 mt-3 btn btn-primary rounded-xl font-medium text-lg text-[#ffffff] cursor-pointer">
                Complete Learning
            </button>
        </div>
        `;
        modal.append(div);
}
// details take modal akare show kortechi
