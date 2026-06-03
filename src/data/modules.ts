import type { Lesson, Module, QuizQuestion } from "@/types";

const baseParagraphs = [
  "Euro Academy non misura solo quanto una persona capisce una teoria. Misura come ragiona quando deve parlare con un imprenditore reale, con poco tempo, aspettative alte e nessun margine per frasi vuote. Ogni lezione va studiata con attenzione pratica: non devi chiederti se il concetto suona bene, devi chiederti come lo useresti in una conversazione vera, davanti a una persona che sta valutando se fidarsi di te, del Metodo Sirius e di EuroSirius.",
  "Il venditore di servizi marketing non vende un oggetto facile da toccare. Vende chiarezza, direzione, priorita, metodo e possibilita di crescita. Per questo deve saper ascoltare prima di proporre. Deve distinguere tra un cliente curioso e un cliente che ha un problema concreto. Deve evitare la pressione sterile e costruire una conversazione in cui il valore diventa evidente. Questo richiede disciplina, preparazione e capacita di collegare ogni parola a una conseguenza concreta per il business del cliente.",
  "Quando studi questa parte, non limitarti a memorizzare definizioni. Prendi un'attivita reale, osserva il sito, i social, le recensioni, l'offerta e il modo in cui comunica. Chiediti cosa sta funzionando, cosa confonde il cliente finale, dove manca fiducia e quale servizio EuroSirius potrebbe creare un miglioramento misurabile. La differenza tra un candidato generico e un candidato interessante sta proprio qui: il primo ripete concetti, il secondo vede pattern e opportunita.",
  "Il Metodo Sirius richiede lucidita. Significa fare domande precise, ascoltare senza interrompere, prendere appunti, riformulare il problema e proporre solo quando hai capito davvero il contesto. Se un imprenditore percepisce che vuoi soltanto chiudere, si difende. Se percepisce che stai leggendo il suo business con serieta, comincia ad ascoltare. La vendita diventa allora una selezione reciproca: tu valuti se puoi portare valore, il cliente valuta se meriti fiducia.",
  "La qualita finale del tuo percorso dipende dalla capacita di trasformare studio in comportamento. Non basta sapere che bisogna fare follow-up: devi scrivere follow-up puliti. Non basta sapere che il prezzo va difeso: devi spiegare il valore senza irrigidirti. Non basta dire che l'AI puo aiutare: devi consegnare ragionamenti personali, verificabili e difendibili. Euro Academy premia candidati concreti, responsabili e capaci di migliorare rapidamente attraverso feedback e pratica."
];

function lessonContent(moduleTitle: string, lessonTitle: string): string {
  const intro = "Questa lezione, dedicata a " + lessonTitle + ", appartiene al modulo " + moduleTitle + ". Il punto non e riempire una pagina di teoria, ma costruire un modo di pensare utilizzabile quando hai davanti un potenziale cliente. In Euro Academy ogni concetto deve diventare una scelta operativa: cosa osservi, che domanda fai, come interpreti una risposta, quando proponi una soluzione e quando invece ti fermi per capire meglio.";
  return [intro, ...baseParagraphs].join("\n\n");
}

function makeLesson(moduleTitle: string, title: string, moduleId: number, index: number): Lesson {
  return {
    id: String(index),
    title,
    duration: String(12 + index) + " minuti",
    objective: "Applicare " + title.toLowerCase() + " in una conversazione commerciale reale senza ricorrere a frasi fatte.",
    content: lessonContent(moduleTitle, title),
    keyConcept: "Il valore nasce quando osservazione, domanda e proposta restano collegati al problema concreto del cliente.",
    mistakeToAvoid: "Trasformare la lezione in una formula rigida da recitare invece di usarla come criterio di ragionamento.",
    microExercise: "Scegli un business reale e scrivi tre frasi operative che useresti oggi per applicare " + title.toLowerCase() + "."
  };
}

function makeQuiz(moduleId: number, title: string): QuizQuestion[] {
  const topic = title.toLowerCase();
  return [
    {
      id: moduleId + "-q1",
      question: "Qual e l'obiettivo principale del modulo " + title + "?",
      options: ["Memorizzare frasi da copiare", "Costruire criteri pratici per vendere valore", "Promettere risultati certi", "Evitare il confronto con il cliente"],
      correctIndex: 1,
      explanation: "Il modulo serve a creare ragionamento commerciale applicabile, non copioni o promesse."
    },
    {
      id: moduleId + "-q2",
      question: "Perche un candidato Euro Academy deve fare domande prima di proporre?",
      options: ["Per allungare la call", "Per sembrare tecnico", "Per capire contesto, problema e priorita", "Per evitare di parlare di prezzo"],
      correctIndex: 2,
      explanation: "Il Metodo Sirius parte dalla comprensione del contesto prima di qualsiasi proposta."
    },
    {
      id: moduleId + "-q3",
      question: "Quale comportamento danneggia di piu la reputazione del candidato?",
      options: ["Prepararsi prima della call", "Dire quando un cliente non e adatto", "Usare pressione e promesse non verificabili", "Prendere appunti durante l'ascolto"],
      correctIndex: 2,
      explanation: "Pressione e promesse deboli riducono fiducia e autorevolezza."
    },
    {
      id: moduleId + "-q4",
      question: "Nel contesto di " + topic + ", che cosa rende forte una proposta?",
      options: ["Essere generica", "Collegare problema, impatto e servizio consigliato", "Presentare tutti i servizi insieme", "Ridurre subito il prezzo"],
      correctIndex: 1,
      explanation: "Una proposta forte collega un problema reale a una soluzione coerente."
    },
    {
      id: moduleId + "-q5",
      question: "Che ruolo ha la disciplina nel percorso?",
      options: ["Sostituisce la competenza", "Serve solo nei primi giorni", "Trasforma studio e feedback in comportamento stabile", "Permette di saltare gli esercizi"],
      correctIndex: 2,
      explanation: "La disciplina rende ripetibili le azioni che migliorano la performance."
    },
    {
      id: moduleId + "-q6",
      question: "Cosa deve evitare un candidato quando usa strumenti AI?",
      options: ["Organizzare le idee", "Migliorare la forma", "Approfondire concetti", "Consegnare contenuti impersonali e non difendibili"],
      correctIndex: 3,
      explanation: "L'AI puo aiutare, ma il lavoro finale deve essere personale, originale e spiegabile."
    },
    {
      id: moduleId + "-q7",
      question: "Quale segnale indica un ragionamento commerciale maturo?",
      options: ["Parlare piu del cliente", "Individuare problemi specifici e priorita", "Usare parole complicate", "Evitare ogni obiezione"],
      correctIndex: 1,
      explanation: "La maturita commerciale si vede dalla capacita di leggere problemi e priorita reali."
    },
    {
      id: moduleId + "-q8",
      question: "Perche non bisogna vendere a tutti?",
      options: ["Per creare distanza artificiale", "Perche alcuni clienti non hanno bisogno, budget o contesto adatto", "Per lavorare meno", "Per evitare domande difficili"],
      correctIndex: 1,
      explanation: "La selezione protegge valore, tempo e reputazione."
    },
    {
      id: moduleId + "-q9",
      question: "Qual e la risposta piu coerente davanti a un rifiuto?",
      options: ["Insistere fino a stancare il cliente", "Ignorare il feedback", "Analizzare cosa migliorare e mantenere professionalita", "Cambiare promessa ogni volta"],
      correctIndex: 2,
      explanation: "Il rifiuto va gestito con lucidita, apprendimento e rispetto."
    },
    {
      id: moduleId + "-q10",
      question: "Che cosa dimostra il superamento del quiz del modulo?",
      options: ["Che il candidato ha concluso ogni selezione", "Che puo sbloccare il prossimo livello del percorso", "Che avra una collaborazione garantita", "Che non deve piu esercitarsi"],
      correctIndex: 1,
      explanation: "Il quiz sblocca il modulo successivo, ma il percorso resta selettivo."
    }
  ];
}

const moduleBlueprints = [
  {
    title: "Mentalita del Venditore: Fame, Disciplina e Responsabilita",
    description: "Prima di imparare a vendere servizi di marketing, il candidato deve imparare a pensare come una persona che porta valore, si prende responsabilita e sa gestire il rifiuto.",
    objectives: ["capire il senso di Euro Academy", "comprendere cosa significa vendere", "distinguere motivazione e disciplina", "affrontare il rifiuto", "sviluppare responsabilita personale", "proteggere reputazione e fiducia"],
    lessons: ["Benvenuto in Euro Academy", "La vendita e una skill fondamentale", "Mentalita da venditore", "Fame e disciplina", "Il rifiuto", "Responsabilita personale", "Parlare con imprenditori", "Etica e reputazione"],
    exerciseTitle: "La mia mentalita di partenza",
    exerciseQuestions: ["Perche vuoi entrare in Euro Academy?", "Cosa significa per te vendere?", "Qual e il tuo obiettivo economico nei prossimi 12 mesi?", "Qual e la tua piu grande debolezza oggi?", "Come reagisci al rifiuto?", "Quali sono 3 abitudini che devi costruire?", "Cosa sei disposto a fare nei prossimi 90 giorni?", "Perche EuroSirius dovrebbe investire tempo su di te?"]
  },
  {
    title: "Metodo Sirius",
    description: "Il sistema commerciale EuroSirius per comunicare valore, capire il cliente e proporre soluzioni senza vendere in modo aggressivo.",
    objectives: ["comprendere il Metodo Sirius", "imparare a non vendere in modo disperato", "capire prima di proporre", "fare domande intelligenti", "comunicare valore", "selezionare clienti adatti"],
    lessons: ["Cos'e il Metodo Sirius", "Vendere senza sembrare disperati", "Capire prima di proporre", "Fare domande intelligenti", "Comunicare valore", "Non vendere a tutti", "Fiducia e autorevolezza", "Applicare il Metodo Sirius"],
    exerciseTitle: "Spiegare il Metodo Sirius",
    exerciseQuestions: ["Spiega con parole tue cos'e il Metodo Sirius e come lo useresti in una conversazione con un imprenditore."]
  },
  {
    title: "Basi di Marketing",
    description: "Le basi necessarie per capire cosa compra davvero un cliente quando acquista servizi marketing.",
    objectives: ["capire cos'e il marketing", "distinguere marketing e pubblicita", "identificare target e offerta", "comprendere posizionamento, lead generation e funnel", "parlare di marketing con chiarezza"],
    lessons: ["Cos'e il marketing", "Marketing e pubblicita", "Target e cliente ideale", "Offerta e posizionamento", "Lead generation", "Funnel e conversione", "Perche un'azienda compra marketing", "Errori comuni"],
    exerciseTitle: "Analisi di una attivita locale",
    exerciseQuestions: ["Analizza un'attivita locale indicando target, offerta e possibile problema di marketing."]
  },
  {
    title: "Servizi EuroSirius",
    description: "Panoramica dei servizi da proporre ai potenziali clienti e del valore che generano.",
    objectives: ["conoscere i principali servizi EuroSirius", "capire a cosa servono", "capire quali problemi risolvono", "imparare a presentarli in modo commerciale"],
    lessons: ["Siti web", "Landing page", "Funnel", "Meta Ads", "Google Ads", "Gestione social", "Lead generation", "Automazioni e CRM"],
    exerciseTitle: "Presentare tre servizi EuroSirius",
    exerciseQuestions: ["Scegli 3 servizi EuroSirius e spiega per ognuno a chi serve, che problema risolve e come lo presenteresti."]
  },
  {
    title: "Trovare Clienti",
    description: "Come individuare potenziali clienti e riconoscere opportunita commerciali reali.",
    objectives: ["capire cos'e un prospect", "trovare attivita potenzialmente interessanti", "analizzare segnali di bisogno", "creare liste contatti", "qualificare i prospect"],
    lessons: ["Cos'e un prospect", "Ricerca su Google Maps", "Analisi Instagram", "Analisi sito web", "Segnali di bisogno", "Creazione lista contatti", "Qualifica del prospect", "Errori da evitare"],
    exerciseTitle: "Lista di 10 potenziali clienti",
    exerciseQuestions: ["Crea una lista di 10 potenziali clienti reali con nome attivita, settore, citta, problema individuato e servizio EuroSirius consigliato."]
  },
  {
    title: "Primo Contatto",
    description: "Come iniziare una conversazione commerciale in modo professionale e non aggressivo.",
    objectives: ["scrivere messaggi di primo contatto", "non sembrare spammer", "attirare attenzione", "proporre una call", "fare follow-up"],
    lessons: ["Obiettivo del primo contatto", "Messaggio WhatsApp", "Messaggio Instagram", "Email commerciale", "Chiamata a freddo", "Follow-up", "Errori da evitare", "Ottenere una call"],
    exerciseTitle: "Tre primi messaggi",
    exerciseQuestions: ["Scrivi 3 primi messaggi diversi: uno per WhatsApp, uno per Instagram e uno per email, riferiti a un business reale."]
  },
  {
    title: "Chiamata Commerciale",
    description: "Come gestire una call commerciale facendo domande, ascoltando e proponendo una soluzione.",
    objectives: ["aprire una chiamata", "creare fiducia", "fare domande utili", "capire problema, budget e urgenza", "presentare una soluzione", "chiudere il prossimo step"],
    lessons: ["Apertura della chiamata", "Creare fiducia", "Fare domande", "Capire problema, budget e urgenza", "Non parlare troppo", "Presentare la soluzione", "Chiudere il prossimo step", "Errori in call"],
    exerciseTitle: "Scaletta di call commerciale",
    exerciseQuestions: ["Scrivi una scaletta di chiamata commerciale di 20 minuti con almeno 10 domande da fare al cliente."]
  },
  {
    title: "Obiezioni e Chiusura",
    description: "Come gestire dubbi, prezzo, indecisione e chiudere uno step successivo.",
    objectives: ["capire cosa sono le obiezioni", "gestire prezzo e indecisione", "rispondere senza aggressivita", "chiudere un prossimo step concreto"],
    lessons: ["Cosa sono le obiezioni", "Costa troppo", "Ci devo pensare", "Mandami qualcosa", "Ne parlo con il socio", "Non ho budget", "Ho gia un'agenzia", "Chiudere il prossimo step"],
    exerciseTitle: "Rispondere a 7 obiezioni",
    exerciseQuestions: ["Scrivi una risposta professionale a 7 obiezioni comuni, senza essere aggressivo."]
  },
  {
    title: "Casi Pratici",
    description: "Allenamento su analisi reali di business, problemi e opportunita.",
    objectives: ["analizzare un sito web", "analizzare social e Google Business", "capire offerta e recensioni", "individuare problemi concreti", "collegare problema e servizio"],
    lessons: ["Analisi sito web", "Analisi social", "Analisi Google Business", "Analisi offerta", "Analisi recensioni", "Problemi e opportunita", "Collegare problema e servizio", "Mini proposta"],
    exerciseTitle: "Mini analisi di un business reale",
    exerciseQuestions: ["Scegli un business reale e prepara una mini analisi con 5 problemi e 3 opportunita di crescita."]
  },
  {
    title: "Preparazione Esame Finale",
    description: "Preparazione a quiz finale, tesina e prova live davanti al fondatore.",
    objectives: ["capire il quiz finale", "preparare la tesina", "scegliere un business reale", "applicare il Metodo Sirius", "difendere la propria analisi", "prepararsi all'esame live"],
    lessons: ["Come funziona l'esame finale", "Come funziona il quiz da 30 minuti", "Come scegliere il business della tesina", "Come scrivere la tesina", "Come applicare il Metodo Sirius", "Come prepararsi alla prova live", "Come difendere la propria analisi", "Criteri di valutazione"],
    exerciseTitle: "Indice della tesina finale",
    exerciseQuestions: ["Scrivi l'indice della tua tesina finale e scegli il business da analizzare."]
  }
];

export const modules: Module[] = moduleBlueprints.map((module, index) => {
  const id = index + 1;
  return {
    id,
    title: module.title,
    description: module.description,
    objectives: module.objectives,
    lessons: module.lessons.map((lesson, lessonIndex) => makeLesson(module.title, lesson, id, lessonIndex + 1)),
    exercise: {
      title: module.exerciseTitle,
      prompt: "Consegna un elaborato personale, concreto e difendibile. Non cercare la risposta perfetta: mostra il tuo modo di ragionare e collega ogni scelta a un business reale.",
      questions: module.exerciseQuestions
    },
    quiz: makeQuiz(id, module.title),
    passScore: 7
  };
});

export function getModule(id: number): Module | undefined {
  return modules.find((module) => module.id === id);
}

export function getLesson(moduleId: number, lessonId: string): Lesson | undefined {
  return getModule(moduleId)?.lessons.find((lesson) => lesson.id === lessonId);
}
