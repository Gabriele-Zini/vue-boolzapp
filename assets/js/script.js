const { createApp } = Vue;
const dt = luxon.DateTime.now();
const formattedTime = dt.toFormat("HH:mm");
console.log(dt);

createApp({
  data() {
    return {
      searchText: "",
      leftVisible: true,
      activeIndex: 0,
      typing: false,
      phrases: [
        "nel mezzo del cammin di nostra vita",
        "ok, ma non lo so",
        "la pasta al ragù",
        "ei fu, siccome immobile",
        "caro nome che il mio cor, festi primo palpitar",
        "ciao",
        "su di noi, nemmeno una nuvola",
        "perché",
        "fatti non foste a viver come bruti",
        "hai fatto bene",
        "non me la sento",
        "che fai?",
      ],

      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          leftVisible: true,
          randomTime: this.generateRandomTime(),
          online: false,
          newOnlineStatus: false,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: false,
          leftVisible: true,
          randomTime: this.generateRandomTime(),
          online: false,
          newOnlineStatus: false,
          newOnlineTime: this.getCurrentTimeLuxon(),
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: false,
          leftVisible: true,
          randomTime: this.generateRandomTime(),
          online: false,
          newOnlineStatus: false,
          newOnlineTime: this.getCurrentTimeLuxon(),
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: false,
          leftVisible: true,
          randomTime: this.generateRandomTime(),
          online: false,
          newOnlineStatus: false,
          newOnlineTime: this.getCurrentTimeLuxon(),
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: false,
          leftVisible: true,
          randomTime: this.generateRandomTime(),
          online: false,
          newOnlineStatus: false,
          newOnlineTime: this.getCurrentTimeLuxon(),
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          randomTime: this.generateRandomTime(),
          avatar: "_6",
          visible: false,
          leftVisible: true,
          online: false,
          newOnlineStatus: false,
          newOnlineTime: this.getCurrentTimeLuxon(),
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          randomTime: this.generateRandomTime(),
          avatar: "_7",
          visible: false,
          leftVisible: true,
          online: false,
          newOnlineStatus: false,
          newOnlineTime: this.getCurrentTimeLuxon(),
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          randomTime: this.generateRandomTime(),
          avatar: "_8",
          visible: false,
          leftVisible: true,
          online: false,
          newOnlineStatus: false,
          newOnlineTime: this.getCurrentTimeLuxon(),
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
    };
  },
  methods: {
    contactClicked: function (index) {
      this.contacts.forEach((contact) => {
        contact.visible = false;
      });
      this.contacts[index].visible = true;
      this.activeIndex = index;
    },

    sendMessage(contact) {
      const newMessage = contact.newMessage;
      const currentDate = this.getCurrentTimeLuxon();
      if (newMessage.trim() !== "") {
        contact.messages.push({
          date: currentDate,
          message: newMessage,
          status: "sent",
        });
      }

      contact.newMessage = "";

      setTimeout(() => {
        if (newMessage.trim() !== "") {
          contact.online = true;
          contact.newOnlineStatus = false;
        }
      }, 1000);

      setTimeout(() => {
        const botMessage = this.getRandomPhrase();
        const botDate = this.getCurrentTimeLuxon();
        if (newMessage.trim() !== "") {
          contact.messages.push({
            date: botDate,
            message: botMessage,
            status: "received",
          });
        }
      }, 2500);

      setTimeout(() => {
        if (newMessage.trim() !== "") {
          contact.online = false;
          contact.newOnlineStatus = true;
          contact.newOnlineTime = this.getCurrentTimeLuxon();
        }
      }, 3500);
    },
    deleteMessage(contact, index) {
      contact.messages.splice(index, 1);
    },
    searchName() {
      let search = this.searchText.toLowerCase();
      this.contacts.forEach((contact) => {
        if (contact.name.toLowerCase().includes(search)) {
          contact.leftVisible = true;
        } else {
          contact.leftVisible = false;
        }
      });
    },

    dateFormatting(date) {
      let luxonDate;
      if (luxon.DateTime.fromFormat(date, "HH:mm").isValid) {
        luxonDate = luxon.DateTime.fromFormat(date, "HH:mm");
      } else {
        luxonDate = luxon.DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
      }

      return luxonDate.toLocaleString({ hour: "numeric", minute: "numeric" });
    },
    generateRandomTime() {
      const currentDate = new Date();
      const randomHours = Math.floor(
        Math.random() * (currentDate.getHours() + 1)
      );
      const randomMinutes = Math.floor(
        Math.random() * currentDate.getMinutes()
      );

      const formattedHours =
        randomHours < 10 ? "0" + randomHours : randomHours.toString();
      const formattedMinutes =
        randomMinutes < 10 ? "0" + randomMinutes : randomMinutes.toString();

      return `${formattedHours}:${formattedMinutes}`;
    },

    saveRandomTime(index) {
      this.contacts[index].randomTime = this.generateRandomTime();
    },

    typingFunction() {
      this.typing = true;
    },
    notTyping() {
      this.typing = false;
    },
    notTypingWithDelay() {
      setTimeout(() => {
        this.notTyping();
      }, 150);
    },
    getRandomPhrase() {
      const randomIndex = Math.floor(Math.random() * this.phrases.length);
      return this.phrases[randomIndex];
    },

    getCurrentTimeLuxon() {
      return luxon.DateTime.now().toFormat("HH:mm");
    },
    troncateMessage(message) {
      if (message && message.length > 20) {
        const shortMessage = message.substring(0, 20) + "...";
        return shortMessage;
      } else {
        return message;
      }
    },
  },
}).mount("#app");
