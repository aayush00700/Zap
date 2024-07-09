# LinkUp Chat Application

LinkUp is a real-time messaging application built using React, Tailwind CSS, Firebase, and Zustand for state management. It provides a seamless chatting experience with several key features.

![image](https://github.com/Akshansh029/React-Firebase-Chat-Application/assets/145496594/1f87c8af-b65d-42c5-90c5-dabda1b1b6cb)

## Features

- **Real-time Messaging**: Instant messaging capability using Firebase Realtime Database.
- **Google Authentication**: Secure login with Google accounts.
- **Emoji Support**: Send and receive emojis in messages.
- **Image Sharing**: Share images within the chat interface.
- **User Blocking**: Ability to block/unblock users.
- **User Search**: Search functionality to find specific users.

## Tech Stack
- **React**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Firebase**: Backend-as-a-Service platform for database, authentication, and hosting.
- **Zustand**: State management library for React applications.

## Folder Structure

```
- node_modules/
- public/
- src/
  - components/
    - Chat/
    - Details/
    - List/
    - Login/
    - Notifications/
  - lib/
    - chatStore.js
    - firebase.js
    - upload.js
    - useTimeAgo.js
  - App.jsx
  - index.css
  - main.jsx
- .env
- .gitignore
- eslintrc.html
- package-lock.json
- package.json
- README.md
- tailwind.config.js
```

## Screenshots
### Login/Signup
![image](https://github.com/Akshansh029/React-Firebase-Chat-Application/assets/145496594/30b2ea0f-c43c-4870-988f-a4d309c80087)
### Homepage
![image](https://github.com/Akshansh029/React-Firebase-Chat-Application/assets/145496594/e6d7a28b-d1b4-48fc-854d-5ac855a53a4b)
### Emoji section
![image](https://github.com/Akshansh029/React-Firebase-Chat-Application/assets/145496594/2de619df-cb25-44d2-9280-4d7dfd4d3896)



## Getting Started

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/linkup-chat.git
   cd linkup-chat
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration in `src/lib/firebase.js`.

4. **Run the application**:
   ```
   npm start
   ```

5. **Open in your browser**:
   ```
   http://localhost:3000
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

Lama Dev Chat App Starter template - This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
