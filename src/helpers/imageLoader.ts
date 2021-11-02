import ImagePicker, {Image} from "react-native-image-crop-picker";
import {imagePickerDefaultOptions} from "../config";

interface IProps {
    newImages: Image[]
    setNewImages: (newImages: Image[]) => void
}

const ImageLoader = ({newImages, setNewImages}: IProps) => {

    const loadImages = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            ...imagePickerDefaultOptions
        }).then(image => {
            setNewImages([...newImages, image])
            // nextStep()
        }).catch(e => {
            console.log(e)
        });
    }
    const loadCamera = () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            ...imagePickerDefaultOptions
        }).then(image => {
            setNewImages([...newImages, image])
            // nextStep()
        }).catch(e => {
            console.log(e)
        });
    }
    return {loadCamera, loadImages}
}

export default ImageLoader
