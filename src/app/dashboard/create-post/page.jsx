"use client"

import { useUser } from "@clerk/nextjs"
import dynamic from "next/dynamic"
const ReactQuill=dynamic(()=>import("react-quill-new"),{ssr:false})
import 'react-quill-new/dist/quill.snow.css';


const page = () => {
    const{isSignedIn,user,isLoaded}=useUser()

    if(!isLoaded){
        return null
    }

    if(isSignedIn && user.publicMetadata.isAdmin){
        return(
            <div className="px-4 py-8 max-w-3xl mx-auto min-h-screen">
                <h1 className="font-semibold text-center my-7 text-4xl text-slate-900">
                    Create a Post
                </h1>
                <form className="flex flex-col gap-6 bg-white/60 rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="flex-1">
                            
                            <input
                                type="text"
                                placeholder="Title"
                                required
                                id="title"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                        <div className="w-full sm:w-56">
                           
                            <select
                                id="category"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm text-slate-700"
                            >
                                <option className="text-slate-500 text-sm uppercase tracking-wide" value="uncategorized">
                                    Select a Category
                                </option>
                                <option className="text-slate-800 text-sm font-medium" value="javascript">Javascript</option>
                                <option className="text-slate-800 text-sm font-medium" value="reactjs">ReactJS</option>
                                <option className="text-slate-800 text-sm font-medium" value="nextjs">NextJS</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-600">Cover Image</span>
                        <div className="flex justify-between gap-4 flex-col sm:flex-row items-start sm:items-center border-2 border-dashed border-amber-300 rounded-xl p-4 bg-amber-50/40">
                            <input type="file" accept="image/*" className="text-sm text-slate-600"/>
                            <button type="button" className="px-4 py-2 rounded-md border border-amber-400 text-amber-600 hover:bg-amber-100 transition-colors text-sm">
                                Upload Image
                            </button>
                        </div>
                    </div>

                    <ReactQuill
                        theme="snow"
                        placeholder="Write Something..."
                        className="h-72 mb-4 border border-slate-200 rounded-xl overflow-hidden"
                        required
                    />
                    <button className="p-3 w-full rounded-xl bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition-colors">
                        Submit
                    </button>
                </form>

            </div>
        )
    }else{
        return (
            <h1 className="text-center text-3xl my-7 font-semibold">Access denied</h1>
        )
    }
  
}

export default page