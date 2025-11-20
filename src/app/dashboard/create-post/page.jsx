"use client";

import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const page = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError,setPublishError]=useState(null)
  const router=useRouter()
  console.log(formData)

//   Handle iamge uoload
  const handleImageUpload = async () => {
    if (!file) {
      setImageUploadError("Please select an image first.");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    try {
      setImageUploadError(null);
      setImageUploadProgress("uploading");

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      setFormData((prev) => ({
        ...prev,
        imageUrls: result.url
      }));
      setImageUploadProgress(null);
    } catch (error) {
      setImageUploadError("Failed to upload image. Please try again.");
      setImageUploadProgress(null);
      console.error("Error uploading image", error);
    }
  };
// Remove Image
  const handleRemoveImage = (_index) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (updated.imageUrls) {
        delete updated.imageUrls;
      }
      return updated;
    });
    setFile(null);
    setImageUploadError(null);
  };

// handle submit
  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
        const res=await fetch('/api/post/create',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                ...formData,
                userMongoId:user.publicMetadata.userMongoId
            })
        })

        const data=await res.json()

        if(!res.ok){
            setPublishError(data.message)
            return
        }

        if(res.ok){
            setPublishError(null)
            router.push(`/post/${data.slug}`)
        }
    } catch (error) {
        setPublishError("Something went wrong")
    }

  }

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="px-4 py-8 max-w-3xl mx-auto min-h-screen">
        <h1 className="font-semibold text-center my-7 text-4xl text-slate-900">
          Create a Post
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white/60 rounded-2xl p-6 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Title"
                required
                id="title"
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="w-full sm:w-56">
              <select
                id="category"
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm text-slate-700"
              >
                <option
                  className="text-slate-500 text-sm uppercase tracking-wide"
                  value="uncategorized"
                >
                  Select a Category
                </option>
                <option
                  className="text-slate-800 text-sm font-medium"
                  value="javascript"
                >
                  Javascript
                </option>
                <option
                  className="text-slate-800 text-sm font-medium"
                  value="reactjs"
                >
                  ReactJS
                </option>
                <option
                  className="text-slate-800 text-sm font-medium"
                  value="nextjs"
                >
                  NextJS
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-600">
              Cover Image
            </span>
            <div className="flex justify-between gap-4 flex-col sm:flex-row items-start sm:items-center border-2 border-dashed border-amber-300 rounded-xl p-4 bg-amber-50/40">
              <input
                type="file"
                accept="image/*"
                className="text-sm text-slate-600"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={!!imageUploadProgress}
                className="px-4 py-2 rounded-md border border-amber-400 text-amber-600 hover:bg-amber-100 transition-colors text-sm disabled:opacity-60"
              >
                {imageUploadProgress ? "Uploading..." : "Upload Image"}
              </button>
            </div>
            {imageUploadError && (
              <p className="text-sm text-red-500">{imageUploadError}</p>
            )}
            {formData?.imageUrls && (
              <div className="rounded-xl border border-slate-100 bg-slate-50 min-h-[220px] flex items-center justify-center w-full">
                <div className="relative w-full group">
                  <img
                    src={formData.imageUrls}
                    alt="Uploaded cover"
                    className="max-h-[220px] w-full object-cover rounded-lg shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(0)}
                    className="absolute top-2 right-2 bg-amber-400 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:bg-amber-600"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <ReactQuill
            theme="snow"
            placeholder="Write Something..."
            className="h-72 mb-4 border border-slate-200 rounded-xl overflow-hidden"
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />
          <button className="p-3 w-full rounded-xl bg-amber-300 text-slate-900 font-semibold hover:bg-amber-400 transition-colors">
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <h1 className="text-center text-3xl my-7 font-semibold">Access denied</h1>
  );
};

export default page;
