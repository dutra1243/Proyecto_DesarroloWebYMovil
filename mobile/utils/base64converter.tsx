import { readFile } from 'react-native-fs';

export const loadImageBase64 = async (capturedImageURI: string) => {
    try {
        const base64Data = await readFile(capturedImageURI, 'base64');
        return 'data:image/jpeg;base64,' + base64Data;
    } catch (error) {
        console.error('Error converting image to base64:', error);
    }
};