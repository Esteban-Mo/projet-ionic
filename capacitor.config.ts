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
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      spinnerColor: '#4a90e2',
      launchAutoHide: true,
      launchShowDuration: 1500
    },
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;
