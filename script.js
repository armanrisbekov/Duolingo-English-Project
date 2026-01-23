let selectedVoiceType = "male"; 
let selectedLanguage = "kz";
const speechElement = document.getElementById("speech-bubble");

const translations = {
    kz: { 
        welcome: "Сәлем, менің атым Dream. Сізге қалай көмектесе аламын?", 
        creator: "Арман Рисбеков мені өткен түні жасап, Dream деп атады. Ол мені бүгінгі English Homework үшін 10 балл алу мақсатында жасады.", 
        abilities: "Мен сіздің көңіл-күйіңізді көтере аламын, әзіл айтып беремін, кеңес бере аламын, ақпарат тауып беремін.", 
        story: "Бір күні бауырсақ ата мен ападан қашып кетеді. Ол қоянмен, қасқырмен, аюмен кездеседі, бірақ олардан да құтылады. Бірақ сосын айлакер түлкімен кездеседі...",
        btn1: "Сені кім жасады?", btn2: "Не істей аласың?", btn3: "Ертегі айтып бер", btn4: "🔄 Басынан бастау"
    },
    tr: { 
        welcome: "Merhaba, benim adım Dream. Size nasıl yardımcı olabilirim?", 
        creator: "Arman Risbekov beni dün gece yarattı ve adımı Dream koydu. Beni bugünkü English Homework'ten 10 puan almam için tasarladı.", 
        abilities: "Ruh halinizi düzeltebilir, şakalar yapabilir, tavsiyeler verebilir ve sizin için bilgi bulabilirim.", 
        story: "Bir varmış, bir yokmuş... Küçük bir hamur topu dede ve nineden kaçmış. Yolda tavşan, kurt ve ayı ile karşılaşmış ama hepsinden kurtulmuş. Fakat sonra kurnaz bir tilkiyle karşılaşmış...",
        btn1: "Seni kim yarattı?", btn2: "Neler yapabilirsin?", btn3: "Bana masal anlat", btn4: "🔄 Baştan başla"
    },
    en: { 
        welcome: "Hello, my name is Dream. How can I help you?", 
        creator: "Arman Risbekov created me last night and named me Dream. He made me to get 10 points on today's English Homework.", 
        abilities: "I can lift your mood, tell jokes, give advice, and find information for you.", 
        story: "Once upon a time, there was a little bun. He ran away from the old man and woman. He met a rabbit, a wolf, and a bear, but he escaped them all. But then, he met a cunning fox...",
        btn1: "Who created you?", btn2: "What can you do?", btn3: "Tell me a fairy tale", btn4: "🔄 Restart"
    },
    ru: { 
        welcome: "Привет, меня зовут Dream. Как я могу вам помочь?", 
        creator: "Арман Рисбеков создал меня прошлой ночью и назвал Dream. Он создал меня, чтобы получить 10 баллов за English Homework.", 
        abilities: "Я могу поднять вам настроение, рассказать шутки, дать совет и найти информацию.", 
        story: "Жил-был колобок. Он убежал от дедушки и бабушки. Он встретил зайца, волка и медведя, но всех обманул. Но потом он встретил хитрую лису...",
        btn1: "Кто тебя создал?", btn2: "Что ты умеешь?", btn3: "Расскажи сказку", btn4: "🔄 Заново"
    }
};

function updateButtons() {
    document.getElementById("actionBtn").innerText = translations[selectedLanguage].btn1;
    document.getElementById("abilitiesBtn").innerText = translations[selectedLanguage].btn2;
    document.getElementById("fairyTaleBtn").innerText = translations[selectedLanguage].btn3;
    document.getElementById("restartBtn").innerText = translations[selectedLanguage].btn4;
}

document.getElementById("languageSelector").addEventListener("change", (e) => {
    selectedLanguage = e.target.value;
    updateButtons();
});

function selectRobot(type) {
    selectedVoiceType = type;
    if (type === 'male') {
        document.getElementById("femaleBtn").style.display = "none";
        document.getElementById("maleBtn").style.display = "inline-block";
    } else {
        document.getElementById("maleBtn").style.display = "none";
        document.getElementById("femaleBtn").style.display = "inline-block";
    }
    updateButtons();
    document.getElementById("actionBtn").style.display = "inline-block";
    speak(translations[selectedLanguage].welcome);
}

function speak(text) {
    window.speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: 'en-US', tr: 'tr-TR', kz: 'kk-KZ', ru: 'ru-RU' };
    utterance.lang = langMap[selectedLanguage];
    
    if (selectedVoiceType === 'male') {
        utterance.pitch = 0.6;
        utterance.rate = 0.9;
    } else {
        utterance.pitch = 1.6;
        utterance.rate = 1.0;
    }
    
    speechElement.innerText = "";
    let words = text.split(" ");
    let i = 0;
    const interval = setInterval(() => {
        if (i < words.length) {
            speechElement.innerText += words[i] + " ";
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
    window.speechSynthesis.speak(utterance);
}

function revealCreator() {
    speak(translations[selectedLanguage].creator);
    document.getElementById("actionBtn").style.display = "none";
    document.getElementById("abilitiesBtn").style.display = "inline-block";
}

function revealAbilities() {
    speak(translations[selectedLanguage].abilities);
    document.getElementById("abilitiesBtn").style.display = "none";
    document.getElementById("fairyTaleBtn").style.display = "inline-block";
}

function tellFairyTale() {
    speak(translations[selectedLanguage].story);
    document.getElementById("fairyTaleBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";
}

function restart() { location.reload(); }
updateButtons();
