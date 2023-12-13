import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { imageUpload } from "../../../../api/utils";
import axiosSecure from "../../../../api/axiosSecure";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import JoditEditor from 'jodit-react';
import './UpdateBlog.css'

const UpdateBlog = () => {
    const { user } = useAuth();
    const inputRef = useRef(null);
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState({})

    useEffect(() => {
        axiosSecure.get(`/blogs/${id}`)
            .then(data => setBlog(data.data))
    }, [id])

    const editor = useRef(null);
    // const [content, setContent] = useState('');
    const [contentValue, setContentValue] = useState('');


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
        const content = contentValue ? contentValue : blog?.content;
        const imageFile = image ? image : "";
        let imgBBData = null

        try {
            if (image) {
                const imageData = await imageUpload(imageFile);
                imgBBData = imageData
            }

            const blogDoc = {
                title,
                content,
                thumbnail: imgBBData ? imgBBData?.data?.display_url : blog?.thumbnail,
                email: user?.email,
                name: user?.displayName,
                image: user?.photoURL,
                status: blog?.status
            };

            const { data } = await axiosSecure.put(`/blogs/${blog?._id}`, blogDoc);

            if (data?.modifiedCount > 0 || data?.matchedCount > 0) {
                toast.success('Blog has been updated successfully');
                navigate('/dashboard/content-management', { replace: true });
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="pt-12 pb-32 px-4 lg:px-6 xl:px-12">
            <div>
                <Typography
                    variant="lead"
                    color="blue-gray"
                    className="text-start text-2xl lg:text-4xl font-medium mb-7"
                >
                    Update a Blog
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
                                    <>
                                        <img src={blog?.thumbnail} alt="" className="w-full h-full object-cover" />
                                    </>
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
                            defaultValue={blog?.title}
                        />
                        <Typography variant="h6" color="blue-gray" className="mb-3 mt-6">
                            Blog Content
                        </Typography>
                        <JoditEditor
                            ref={editor}
                            value={blog.content}
                            tabIndex={1}
                            onBlur={newContent => setContentValue(newContent)}
                        // onChange={newContent => setContent(newContent)}
                        />
                        <div className="mt-6 flex items-center gap-4">
                            <Button type="submit" color="green">
                                Update Blog
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;