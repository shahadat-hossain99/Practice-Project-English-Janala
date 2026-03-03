console.log("i am connected");

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  console.log(id);
  const url = ` https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (levelWords) => {
  console.log(levelWords);

  const wordContainer = document.getElementById("word-container");
  // wordContainer.innerHTML = "";

  levelWords.forEach((word) => {
    const wordCard = document.createElement("div");

    wordCard.innerHTML = `
    
    
    `;
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

     <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary font-semibold text-sm">
        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
        </button>
    
    `;

    levelContainer.appendChild(lessonCard);
  });
};
loadLessons();
