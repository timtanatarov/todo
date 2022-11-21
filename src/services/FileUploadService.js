import http from "../http-common";

/**
 * Функция загрузки файлов в задачу
 * @param file - файл, который загружается в задачу
 * @param onUploadProgress - состояние загрузки данного файла
 * @returns {Promise<AxiosResponse<any>>} - запрос axios загрузки файла в задачу, на некоторый сервер
 */
const upload = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("files", file);

    return http.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

/**
 * Функция загрузки файлов из задачи
 * @returns {Promise<AxiosResponse<any>>} - запрос axios на скачивание файлов из задачи
 */
const getFiles = () => {
    return http.get("/files");
};

/**
 * Объект двух вышеописанных функций, который далее экспортируется в 'FilesUpload'
 * @type {{upload: (function(*, *): Promise<AxiosResponse<*>>), getFiles: (function(): Promise<AxiosResponse<*>>)}}
 */
const FileUploadService = {
    upload,
    getFiles,
};

export default FileUploadService;