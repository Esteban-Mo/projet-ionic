import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export class CameraService {
  static async takePicture(): Promise<string | undefined> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      return image.dataUrl;
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image:', error);
      return undefined;
    }
  }
} 