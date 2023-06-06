import { useState } from "react";
import "./style.scss";

const ImageUpload = ({ onChangeCB, value }) => {
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
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
