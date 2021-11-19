import ImagePicker, {Image, Options} from "react-native-image-crop-picker";

interface IProps {
    setNewImage: (newImages: Image) => void
}

const ImageLoader = ({setNewImage}: IProps) => {
    const options: Options = {
        mediaType: 'photo',
        freeStyleCropEnabled: true,
        forceJpg: true,
        cropping: true,
        width: 2000,
        // height: 2000
    }
    const callBack = (image: Image) => {
        if (!image.filename) {
            image.filename = image.path.split('/').pop()
        }
        setNewImage(image)
    }
    const loadImages = () => {
        ImagePicker.openPicker(options).then(callBack).catch(e => {
            console.log(e)
        });
    }
    const loadCamera = () => {
        ImagePicker.openCamera(options).then(callBack).catch(e => {
            console.log(e)
        });
    }
    return {loadCamera, loadImages}
}

export default ImageLoader
