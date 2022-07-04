import "./style.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Features from "./Components/Features";
import { useRef, useState, useEffect } from 'react';
import AddFileImg from "./Images/addfile_img.svg";
import { AiOutlineClear } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import imageCompression from "browser-image-compression";
import jsZip from "jszip";
import { saveAs } from "file-saver";
import { uid } from "uid";

const options = {
  initialQuality: 0.6
};

function App() {
  const features = useRef();
  const home = useRef();
  const [drag, setDrag] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [files, setFiles] = useState([]);
  const [saved, setSaved] = useState(0);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const downloadAllHandle = () => {
    const zip = new jsZip();
    imageList.map((image) => {
      zip.file(image.name, image.fileOutput, { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "compressor.zip");
    });
  };

  const clearList = () => {
    setImageList([]);
    setSaved(0);
  };


  useEffect(() => {
    if (files.length === 0 && imageList.length > 0) {
      setSaved(imageList.reduce((total, item) => (total + Math.round(item.beforeSize)), 0) - imageList.reduce((total, item) => (total + Math.round(item.afterSize)), 0));
    }

  }, [imageList]);

  useEffect(() => {
    files.map(async (file) => {
      const output = await imageCompression(file.file, options).then(
        (output) => {
          return output;
        }
      );

      const downloadLink = URL.createObjectURL(output);
      const afterSize = output.size;
      const fileOutput = output;
      const percent = Math.abs(
        (((afterSize - file.file.size) / file.file.size) * 100).toFixed(0)
      );


      setImageList((img) => {
        return img.map((elem) => {
          if (elem.id === file.id) {
            return {
              ...elem,
              downloadLink,
              afterSize,
              fileOutput,
              percent,
              active: true
            };
          }
          return elem;
        });
      });

      setFiles((a) => a.filter((item) => item.id !== file.id));
    });

  }, [files]);

  const inputHandle = (e) => {
    const inputFiles = e.target.files;
    //setFiles([]);
    if ([...inputFiles].length > 0) {
      [...inputFiles].map((inputFileItem) => {
        if (
          inputFileItem.type === "image/jpeg" ||
          inputFileItem.type === "image/png" ||
          inputFileItem.type === "image/webp"
        ) {
          const id = uid();
          const name = inputFileItem.name;
          const beforeSize = inputFileItem.size;
          setFiles((files) => [...files, { id: id, file: inputFileItem }]);
          setImageList((files) => [
            ...files,
            {
              id: id,
              file: inputFileItem,
              name: inputFileItem.name,
              beforeSize
            }
          ]);
        }
      });
    }
  };

  const featuresHandleClick = () => {
    features.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  const homeHandlClick = () => {
    home.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  const onDragEnterUploadBox = (e) => {
    e.preventDefault();
    setDrag(true);
  }

  const onDragLeaveUploadBox = (e) => {
    setDrag(false);
  }

  return (
    <>
      <div className="relative h-max min-h-screen" ref={home}>
        <Header featuresHandleClick={featuresHandleClick} />
        <main>
          <section className={`section-1 ${imageList.length > 0 ? "upload-active" : "upload-deactive"}`} >
            <div className="container max-w-7xl mx-auto flex items-center justify-center flex-col animate-opacity">
              <h1 className="text-white md:text-7xl text-3xl mt-14 text-center font-semibold text-opacity-95">Fast & Efficient Image <br /> Compression</h1>
              <h3 className="mt-3 text-white text-center p-5 text-opacity-95 md:text-2xl text-lg">
                Optimize JPEG, PNG, SVG, GIF and WEBP 🚀
              </h3>
              <label className={`upload-box transition cursor-pointer mt-3 custom-dash p-4 flex items-center justify-center group overflow-hidden ${drag ? ("upload-drag") : ""}`} onDragEnter={onDragEnterUploadBox} onDragLeave={onDragLeaveUploadBox} onDrop={onDragLeaveUploadBox}>
                <div className="upload-box-inner pointer-events-none w-full h-full transition rounded-3xl relative ">
                  <div className="file-text-box flex items-center justify-center flex-col transition-all absolute inset-0 opacity-1 group-hover:opacity-0 group-hover:top-10">
                    <div className="add-file-plus w-14 h-14 mb-4 rounded-full bg-white shadow-xl"></div>
                    <div className="text-center">
                      <span className="text-white mb-1 font-medium text-lg" >Drop your images</span> <br />
                      <span className="text-white text-opacity-80 text-sm">Max Unlimited MB.</span>
                    </div>
                  </div>
                  <div className="addfile-box pointer-events-none absolute transition-all inset-0 flex items-center justify-center -top-10 opacity-0 group-hover:opacity-100 group-hover:top-0">
                    <div className="relative w-12 h-16">
                      <img src={AddFileImg} className="mod-0 absolute" />
                      <img src={AddFileImg} className="mod-1 absolute opacity-40 left-0 bottom-0 transition-all" />
                      <img src={AddFileImg} className="mod-2 absolute opacity-40 left-0 bottom-0 transition-all" />
                    </div>
                  </div>
                </div>
                <form encType="multipart/form-data" className="file-form">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => inputHandle(e)}
                    multiple
                  />
                </form>
              </label>
              <div className="all-images w-full md:w-[1060px]">
                <div className="all-images-inner">
                  <div className="compressed-img-list w-full md:w-[1060px]">
                    <div className="table-header">
                      <div></div>
                      <div className="h-name">Name</div>
                      <div>Before</div>
                      <div>Status</div>
                      <div>After</div>
                      <div>Action</div>
                    </div>
                    <div className="table-content">
                      {imageList.map(img => (
                        <div key={img.id}>
                          <div className="c-img">
                            <img src={img.afterSize ? img.downloadLink : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="} />
                          </div>
                          <div className="c-name">
                            {img.name}</div>
                          <div className="c-before">{formatBytes(img.beforeSize)}</div>
                          <div className={`c-percent ${img.percent && ("percent-active")}`}>
                            <span className="compressing-text">Compressing...</span>
                            <span className="saved-text">Saved {img.percent}%</span>
                          </div>
                          <div className="c-after">{img.afterSize && formatBytes(img.afterSize)}</div>
                          <div className="c-action">
                            {img.afterSize && (<a href={img.downloadLink} download={img.name}>Download</a>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="table-bottom-box">
                    <button
                      className="clear-btn"
                      onClick={clearList}
                      disabled={files.length === 0 && imageList.length > 0 ? false : true}
                    ><AiOutlineClear size={18} />Clear List</button>
                    <span className="saved-text">Saved: {formatBytes(saved)}</span>
                    <button
                      className="download-all-btn"
                      onClick={downloadAllHandle}
                      disabled={files.length === 0 && imageList.length > 0 ? false : true}><BsDownload size={16} /> Download All</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <div className="bg-grey-box absolute inset-0 p-6 flex justify-center align-center -z-10">
          <div className="bg-grey bg-gray-500 rounded-3xl"></div>
        </div>
      </div>
      <Features ref={features} />
      <Footer featuresHandleClick={featuresHandleClick} homeHandlClick={homeHandlClick} />
    </>
  );
}

export default App;
