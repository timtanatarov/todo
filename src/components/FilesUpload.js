import React, { useState, useEffect, useRef } from "react";
import UploadService from "../services/FileUploadService";

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [progressInfos, setProgressInfos] = useState({ val: [] });
    const [message, setMessage] = useState([]);
    const [fileInfos, setFileInfos] = useState([]);
    const progressInfosRef = useRef(null)

    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setFileInfos(response.data);
        });
    }, []);

    const selectFiles = (event) => {
        setSelectedFiles(event.target.files);
        setProgressInfos({ val: [] });
    };

    const upload = (idx, file) => {
        let _progressInfos = [...progressInfosRef.current.val];
        return UploadService.upload(file, (event) => {
            _progressInfos[idx].percentage = Math.round(
                (100 * event.loaded) / event.total
            );
            setProgressInfos({ val: _progressInfos });
        })
            .then(() => {
                setMessage((prevMessage) => ([
                    ...prevMessage,
                    "Uploaded the file successfully: " + file.name,
                ]));
            })
            .catch(() => {
                _progressInfos[idx].percentage = 0;
                setProgressInfos({ val: _progressInfos });

                setMessage((prevMessage) => ([
                    ...prevMessage,
                    "Could not upload the file: " + file.name,
                ]));
            });
    };

    const uploadFiles = () => {
        const files = Array.from(selectedFiles);

        let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));

        progressInfosRef.current = {
            val: _progressInfos,
        }

        const uploadPromises = files.map((file, i) => upload(i, file));

        Promise.all(uploadPromises)
            .then(() => UploadService.getFiles())
            .then((files) => {
                setFileInfos(files.data);
            });

        setMessage([]);
    };

    return (
        <div>
            {progressInfos && progressInfos.val.length > 0 &&
                progressInfos.val.map((progressInfo, index) => (
                    <div key={index}>
                        <span>{progressInfo.fileName}</span>
                        <div>
                            <div
                                role="progressbar"
                                aria-valuenow={progressInfo.percentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progressInfo.percentage + "%" }}
                            >
                                {progressInfo.percentage}%
                            </div>
                        </div>
                    </div>
                ))}

            <div>
                <div>
                    <label>
                        <input type="file" multiple onChange={selectFiles} />
                    </label>
                </div>

                <div>
                    <button
                        disabled={!selectedFiles}
                        onClick={uploadFiles}
                    >
                        Прикрепить файлы
                    </button>
                </div>
            </div>

            {message.length > 0 && (
                <div role="alert">
                    <ul>
                        {message.map((item, i) => {
                            return <li key={i}>{item}</li>;
                        })}
                    </ul>
                </div>
            )}

            <div>
                <div>List of Files</div>
                <ul>
                    {fileInfos &&
                        fileInfos.map((file, index) => (
                            <li key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default UploadFiles;