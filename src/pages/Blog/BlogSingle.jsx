import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../api/axiosSecure";
import { Typography } from "@material-tailwind/react";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { Helmet } from "react-helmet-async";

const BlogSingle = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState({})

    useEffect(() => {
        axiosSecure.get(`/blog/${id}`)
            .then(res => {
                setBlog(res.data);
            })
            .catch(error => {
                console.error(error.message);
            })
    }, [id])

    return (
        <div>
            <Helmet>
                <title>{blog?.title} || LifeFlow</title>
            </Helmet>
            <div className="pt-12 pb-32 max-w-5xl mx-auto px-6">
                <div className="mb-24">
                    <img src={blog?.thumbnail} alt="" className="w-full " />
                    <div className="mt-4 mb-6">
                        <div className="flex justify-between items-center">
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-medium"
                            >
                                Posted By:
                                <span className="pl-1 text-red-500 cursor-pointer hover:underline">
                                    {blog?.name}
                                </span>
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-medium"
                            >
                                Published Date:
                                <span className="pl-1 font-black">
                                    {blog?.published_date}
                                </span>
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography
                            color="blue-gray"
                            className="text-2xl lg:text-4xl font-medium mb-2 "
                        >
                            {blog?.title}
                        </Typography>
                    </div>
                    <hr />
                    <div className="mt-6 mb-10">
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                        >

                            {blog?.content}
                        </Typography>
                    </div>
                    <Typography
                        variant="small"
                        color="gray"
                        className="mb-3"
                    >
                        Share on social media:
                    </Typography>
                    <div className="flex items-center gap-2">
                        <FacebookShareButton url={`https://ornate-narwhal-7a3a3b.netlify.app/blog/${blog._id}`} >
                            <FacebookIcon size={28} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={`https://ornate-narwhal-7a3a3b.netlify.app/blog/${blog._id}`} >
                            <TwitterIcon size={28} round={true} />
                        </TwitterShareButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSingle;