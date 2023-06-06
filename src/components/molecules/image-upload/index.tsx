import { FC, useState } from "react";
import "./style.scss";
import ErrorMessage from "../../atoms/errorMessage/ErrorMessage";


interface IImageUpload{
  onChangeCB: (...event: unknown[]) => void;
  imgUrl?: string;
  message: string;
}

const ImageUpload: FC<IImageUpload> = ({ onChangeCB, imgUrl, message }) => {
  const [imagePreview, setImagePreview] = useState(imgUrl);

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }

    onChangeCB && onChangeCB(file);
  };
  return (
    <>
      <div className="image-upload">
        {imagePreview && (
          <img src={imagePreview} alt="logo" className="image" />
        )}
        <input
          className="upload"
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleChange}
        />
      </div>
      <ErrorMessage message={message} />
    </>
  );
};

export default ImageUpload;
