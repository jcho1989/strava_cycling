# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Pre-Installation
Make sure brew is up to date by running brew update and make sure node and npm are installed globally.
```unix
brew update
brew install node
```

# Global NPM Packages
Install node version manager and node LTS
```unix
npm install -g nvm
nvm install --lts
```


# Installation

## Clone repo and install dependencies
```unix
git clone https://github.com/jcho1989/strava_cycling
cd strava_cycling
npm i
```
## Create environment variables file
```unix
touch .env
```

## Add variables from Strava developer dashboard
Update the .env file to
```unix
VITE_APP_CLIENT_ID=CLIENT_ID
VITE_APP_CLIENT_SECRET=CLIENT_SECRET
VITE_APP_REFRESHTOKEN=APP_REFRESHTOKEN
```

## Run the app
Start the app
```unix
npm run dev
```
Open url displayed in terminal in your browser to ensure the app is running
