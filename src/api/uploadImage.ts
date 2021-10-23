import storage from '@react-native-firebase/storage';
import {Alert, Platform} from 'react-native';

interface IUploadImage {
  image: any;
  setUploading: (data: boolean) => void;
  setTransferred: (data: number) => void;
  setImage: (data: any) => void;
}

const uploadImage: IUploadImage = async (
  image,
  setUploading,
  setTransferred,
  setImage,
) => {
  const {uri} = image;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  setUploading(true);
  setTransferred(0);

  const task = storage().ref(filename).putFile(uploadUri);

  // set progress state
  task.on('state_changed', snapshot => {
    setTransferred(
      Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
    );
  });

  try {
    await task;
  } catch (e) {
    console.error(e);
  }

  setUploading(false);

  Alert.alert(
    'Photo uploaded!',
    'Your photo has been uploaded to Firebase Cloud Storage!',
  );

  setImage(null);
};

export default uploadImage;
