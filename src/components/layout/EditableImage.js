import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    console.log("upload");
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadingPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
        // headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
            //resolve();
          });
        }
        throw new Error("Something went wrong");
      });
      // console.log(image);
      await toast.promise(uploadingPromise, {
        loading: "Image Uploading...",
        success: "Image Uploaded",
        error: "Image UpdateFailed!",
      });
    }
  }

  return (
    <div className="p-2 rounded-lg relative max-w-[120px]">
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          alt={"avater"}
          width={125}
          height={125}
        />
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Edit
        </span>
      </label>
    </div>
  );
}

export default EditableImage;
