import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export { uploadImage };