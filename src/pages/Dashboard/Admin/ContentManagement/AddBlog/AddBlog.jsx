import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { imageUpload } from "../../../../../api/utils";
import axiosSecure from "../../../../../api/axiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AddBlog = () => {
    const { user } = useAuth();
    const inputRef = useRef(null);
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleOnClickImage = () => {
        inputRef.current.click()
    };

    const handleImageChange = e => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const content = form.content.value;
        const imageFile = image;

        try {
            const imageData = await imageUpload(imageFile);

            const blog = {
                title,
                content,
                thumbnail: imageData?.data?.display_url,
                email: user?.email,
                name: user?.displayName,
                image: user?.photoURL,
                status: "draft"
            };

            const { data } = await axiosSecure.post(`/blogs`, blog);

            if (data?.insertedId) {
                toast.success('Blog has been added successfully');
                navigate('/dashboard/content-management', { replace: true });
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="pt-12 pb-32 px-4 lg:px-6 xl:px-12">
            <Helmet>
                <title>Add Blog || LifeFlow</title>
            </Helmet>
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
            <div className="lg:p-8 mt-8">
                <div>
                    <div onClick={handleOnClickImage} className="border-dashed border-[2px] border-gray-400 text-center h-96 flex items-center justify-center max-w-5xl mx-auto">
                        {
                            image ?
                                (
                                    <>
                                        <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover" />
                                    </>
                                )
                                :
                                (
                                    <div>
                                        <Typography
                                            variant="h6"
                                            color="gray"
                                        >
                                            Upload an Image By Clicking On This Box.
                                        </Typography>
                                        <div className="text-gray-500 mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                        }
                        <input type="file" ref={inputRef} className="hidden" onChange={handleImageChange} />
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4 max-w-5xl mx-auto">
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Blog Title
                        </Typography>
                        <Input
                            name="title"
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
                        <Textarea name="content" variant="standard" placeholder="Type here..." />
                        <div className="mt-6 flex items-center gap-4">
                            <Button type="submit" color="green">
                                Add Blog
                            </Button>
                            <Button onClick={() => setImage('')} type="reset" color="red">
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;