# Boolzapp Chat Application

## Overview
Boolzapp is a simple chat application built using Vue.js, HTML, and CSS. The application allows users to interact with a chat interface, send messages, and receive responses. It features a left sidebar displaying contacts with their latest messages and a right section showing the selected contact's conversation.

## Features
**Contacts Sidebar**
- Displays a list of contacts with avatars, names, and the timestamp of their latest message.
- Includes a search bar for filtering contacts based on name.

**Chat Interface**
- Selecting a contact from the sidebar displays the conversation in the right section.
- Messages are categorized as "sent" or "received" with timestamps.
- Users can delete their sent messages.
  

  <br>
**Message Input**
- Users can type and send messages.
- Enter key sends the message.

## Data Structure
**Contacts**
- Each contact has a name, avatar, visibility status, and an array of messages.
- Messages have a date, message content, and a status (sent or received).
  
## Vue.js Components
**App Component**
- Manages the overall application state, including contact data, search functionality, and methods for handling messages.

**Vue Directives**
- **v-for Directive**: Dynamically renders contacts in the sidebar and messages in the chat interface.
- **v-show Directive**: Controls the visibility of contacts based on search criteria.
- **v-model Directive**: Establishes a two-way binding for the message input field, ensuring seamless communication between the view and the data.
- **v-if Directive**: Enables conditional rendering, showcasing specific content based on a given condition.



```html
         <input
            id="contacts-filter"
            class="left-searchbar-input"
            placeholder="Cerca o inizia una nuova chat"
            name="search"
            v-model="searchText"
            @input="searchName"
            @keyup.enter="searchName"
          />


<!--...-->


<div
            class="contact"
            v-for="(contact, index) in contacts"
            :key="index"
            @click="contactClicked(index)"
            v-show="contact.leftVisible"
          ></div>

<!--...-->

<div v-for="(contact, index) in contacts" :key="index" v-show="contact.visible"></div>

<!--...-->

<div v-for="(message, index) in contact.messages" :key="index" class="d-flex"></div>
<div v-if="message.status === 'sent'" class="message sent"></div>
```
 <br>



**Methods**
- **contactClicked(index)**: Handles contact selection and visibility.
- **sendMessage(contact)**: Sends a message and simulates a delayed response from a bot.
- **deleteMessage(contact, index)**: Deletes a message from the conversation.
- **searchName()**: Filters contacts based on the search input.
-  **dateFormatting(date)**:  Is responsible for formatting dates in the application. It takes a date string as input and uses Luxon, a JavaScript library for working with dates and times, to convert and format the date. 


```javascript
contactClicked: function (index) {
      this.contacts.forEach((contact) => {
        contact.visible = false;
      });
      this.contacts[index].visible = true;
    },

    sendMessage(contact) {
      const newMessage = contact.newMessage;
      const currentDate = new Date().toLocaleString();
      if (newMessage.trim() !== "") {
        contact.messages.push({
          date: currentDate,
          message: newMessage,
          status: "sent",
        });
      }

      contact.newMessage = "";

      setTimeout(() => {
        const botMessage = "ok";
        const botDate = new Date().toLocaleString();

        contact.messages.push({
          date: botDate,
          message: botMessage,
          status: "received",
        });
      }, 3000);
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
    }
       dateFormatting(date) {
      let luxonDate;

      if (luxon.DateTime.fromFormat(date, "HH:mm").isValid) {
        luxonDate = luxon.DateTime.fromFormat(date, "HH:mm");
      } else {
        luxonDate = luxon.DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
      }

      return luxonDate.toLocaleString({ hour: "numeric", minute: "numeric" });
    }
```

### Project Structure
- **assets**: Contains images and CSS files.
- **js**: Includes the main script (script.js).
- **index.html**: HTML file with the application structure.


### Dependencies
- **Vue.js 3.0**
- **Font Awesome 5.5.0**
