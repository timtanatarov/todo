import React from "react";
import './FileUploader.css';
/**
 * Компонента добавления файлов
 */
function FileUpload() {
    // Инициализация state, в котором будет храниться файл
    const [file, setFile] = React.useState("");

    // Функция-handler
    function handleUpload(event) {
        setFile(event.target.files[0]);
    }

    return (
        <div id="upload-box">
            <input type="file" onChange={handleUpload} />
            <div>
                {file && <ImageThumb image={file} />}
            </div>
            <div>
            </div>
        </div>
    );
}

/**
 * Компонента, которая выводит миниатюру файла
 */
const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
};


export default FileUpload;