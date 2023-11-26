import { Button, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosSecure from "../../../../api/axiosSecure";
import BlogCard from "../../../../components/Dashboard/ContentManagement/BlogCard";
import { useState } from "react";

const ContentManagement = () => {
    const [sortValue, setSortValue] = useState('');

    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs', sortValue],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blogs?sort=${sortValue}`);
            return data
        }
    })

    return (
        <div className="pt-12 pb-32 px-4 lg:px-6 xl:px-12">
            <div className="flex justify-between">
                <Typography
                    variant="lead"
                    color="blue-gray"
                    className="text-start text-2xl lg:text-4xl font-medium mb-7"
                >
                    Content Management
                </Typography>
                <div>
                    <Link to='/dashboard/content-management/add-blog'>
                        <Button
                            size="sm"
                            color="brown"
                        >
                            Add Blog
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='text-end'>
                <select onChange={(e) => setSortValue(e.target.value)} defaultValue='default' className='py-2 px-4 text-sm border-[1px] border-gray-800 bg-transparent rounded-md '>
                    <option value="default" disabled className='text-xs text-gray-500'>Filter By Status</option>
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>
            <hr className='border-gray-600 mt-4 mb-6' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {
                    blogs?.map(blog => <BlogCard key={blog?._id} blog={blog} refetch={refetch} />)
                }
            </div>
        </div>
    );
};

export default ContentManagement;