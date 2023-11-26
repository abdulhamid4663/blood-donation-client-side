import { Input, Typography } from "@material-tailwind/react";
import { useRef, useState } from "react";
import JoditEditor from 'jodit-react';

const AddBlog = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState('');
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const handleOnClickImage = () => {
        inputRef.current.click()
    }

    const handleImageChange = e => {
        setImage(e.target.files[0]);
    }

    return (
        <div className="pt-12 pb-20 px-4 lg:px-6 xl:px-12">
            <div>
                <Typography
                    variant="lead"
                    color="blue-gray"
                    className="text-start text-2xl lg:text-4xl font-medium mb-7"
                >
                    Add Blog
                </Typography>
                <Typography
                    variant="paragraph"
                    color="gray"
                    className="max-w-5xl"
                >
                    Help us inspire others by sharing your personal experiences, insights, and thoughts related to blood donation. Your story could make a profound impact and encourage more people to join the life-saving journey
                </Typography>
            </div>
            <div className="lg:p-8 bg-white rounded-xl mt-8">
                <div>
                    <div onClick={handleOnClickImage} className="border-dashed border-[1px] border-gray-400 text-center h-96 flex items-center justify-center max-w-5xl mx-auto">
                        {
                            image ?
                                (
                                    <>
                                        <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover" />
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Typography
                                            variant="h6"
                                            color="gray"
                                        >
                                            Upload an Image By Clicking On This Box.
                                        </Typography>
                                    </>
                                )
                        }
                        <input type="file" ref={inputRef} className="hidden" onChange={handleImageChange} />
                    </div>
                    <form className="mt-4">
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Blog Title
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Title Here..."
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="mb-3 mt-6">
                            Blog Content
                        </Typography>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;