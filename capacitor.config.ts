import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Game Tracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      backgroundColor: '#121212',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      spinnerColor: '#428cff',
      launchAutoHide: true,
      launchShowDuration: 1500
    }
  }
};

export default config;
