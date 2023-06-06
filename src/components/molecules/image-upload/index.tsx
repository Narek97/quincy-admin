import { FC, useState } from "react";
import "./style.scss";


interface IImageUpload{
  onChangeCB: (...event: unknown[]) => void;
  value: any;
  imgUrl?: string;
}

const ImageUpload: FC<IImageUpload> = ({ onChangeCB, value, imgUrl }) => {
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
    </>
  );
};

export default ImageUpload;
