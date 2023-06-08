import { FC, useState } from "react";
import "./style.scss";
import ErrorMessage from "../../atoms/errorMessage/ErrorMessage";


interface ICustomImageUpload{
  onChangeCB: (...event: unknown[]) => void;
  imgUrl?: string;
  message: string;
}

const CustomImageUpload: FC<ICustomImageUpload> = ({ onChangeCB, imgUrl, message }) => {
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

    onChangeCB(file);
  };
  return (
    <>
      <div className="image-upload">
        {imagePreview && (
          <img src={imagePreview} alt="logo" className="image" />
        )}
        <label htmlFor="imageUpload">Upload Logo</label>
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

export default CustomImageUpload;
