console.log("i am connected");

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  console.log(id);
  const url = ` https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      console.log(clickedBtn);
      clickedBtn.classList.add("active"); // add active class

      displayLevelWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  console.log(details);
  displayWordDetails(details.data);
};

// {
//     "word": "Yearn",
//     "meaning": "তীব্র আকাঙ্ক্ষা করা",
//     "pronunciation": "ইয়ার্ন",
//     "level": 3,
//     "sentence": "She yearned for her hometown.",
//     "points": 3,
//     "partsOfSpeech": "verb",
//     "synonyms": [
//         "long for",
//         "desire",
//         "crave"
//     ],
//     "id": 24
// }

const displayWordDetails = (details) => {
  console.log(details);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `      
   <div class="space-y-2">
            <h2 class="font-semibold text-4xl">
              ${details.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})
            </h2>
          </div>

          <div class="space-y-2">
            <h2 class="font-semibold text-2xl">Meaning</h2>
            <p class="font-bangla text-2xl">${details.meaning}</p>
          </div>

          <div class="space-y-2">
            <h2 class="font-semibold text-2xl">Example</h2>
            <p class="text-2xl">${details.sentence}</p>
          </div>

          <div class="space-y-2">
            <h2 class="font-semibold text-2xl font-bangla" >সমার্থক শব্দ গুলো</h2>
            <span class="btn">dum</span>
            <span class="btn">dum</span>
            <span class="btn">dum</span>
          </div>
          
          
          `;

  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (levelWords) => {
  console.log(levelWords);

  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (levelWords == 0) {
    wordContainer.innerHTML = `
     
     <div class="text-center col-span-full space-y-4 py-10">
         <img src="./assets/alert-error.png" alt="" class="mx-auto" />
        <p class="font-normal text-base font-bangla">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h3 class="font-medium text-4xl font-bangla">
          নেক্সট Lesson এ যান
        </h3>
      </div>

     `;

    return;
  }

  levelWords.forEach((word) => {
    const wordCard = document.createElement("div");

    // {
    //     "id": 5,
    //     "level": 1,
    //     "word": "Eager",
    //     "meaning": "আগ্রহী",
    //     "pronunciation": "ইগার"
    // }

    wordCard.innerHTML = `

     <div class="bg-white rounded shadow-sm text-center py-12 px-5 space-y-6">
        <h3 class="text-3xl font-bold">${word.word ? word.word : "তথ্য পাওয়া যায়নি"}</h3>
        <p class="text-sm font-medium">Meaning /Pronounciation</p>
        <div class="text-3xl font-semibold font-bangla">${word.meaning ? word.meaning : "তথ্য পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "তথ্য পাওয়া যায়নি"}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails(${word.id})" class="btn bg-cyan-50 hover:bg-cyan-100">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-cyan-50 hover:bg-cyan-100">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    
    `;
    wordContainer.appendChild(wordCard);
  });
};

const displayLessons = (lessons) => {
  console.log(lessons);

  const levelContainer = document.getElementById("Level-container");
  levelContainer.innerHTML = "";

  // 2.get into every lesson

  lessons.forEach((lesson) => {
    const lessonCard = document.createElement("div");
    lessonCard.innerHTML = `

     <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary font-semibold text-sm lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
        </button>
    
    `;

    levelContainer.appendChild(lessonCard);
  });
};
loadLessons();
