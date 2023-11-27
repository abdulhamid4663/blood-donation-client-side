import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";


const Blog = () => {
    const [searchValue, setSearchValue] = useState('')

    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs', searchValue],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blogs?status=published&search=${searchValue}`)
            return data;
        }
    })

    const handleSearch = e => {
        e.preventDefault()
        setSearchValue(e.target.search.value)
    }

    return (
        <div className="bg-gray-100 pb-32">
            <div className="pt-12 pb-32 max-w-7xl mx-auto px-6 md:px-4">
                <Typography color="blue-gray" className="text-center text-2xl lg:text-4xl font-medium mb-7">
                    Discover the Published Blogs on Blood Donation
                </Typography>
                <Typography color="blue-gray" variant="paragraph" className="max-w-lg lg:max-w-2xl mb-32 mx-auto text-center">
                    Step into a world of Voices for Life, where each blog is a testament to the power of community, compassion, and commitment to saving lives. Explore our published blogs and be inspired by the diverse voices that echo the importance of blood donation.
                </Typography>
                <hr className="border-blue-gray-300" />
                <div className="grid grid-cols-1 lg:grid-cols-7 mt-6">
                    <div className="lg:col-span-4 xl:col-span-5">
                        {
                            blogs?.map(blog => {
                                return (
                                    <div key={blog._id} className="mb-24">
                                        <img src={blog?.thumbnail} alt="" className="w-full " />
                                        <div>
                                            <Typography
                                                color="blue-gray"
                                                className="text-2xl lg:text-4xl font-medium mb-2 mt-6"
                                            >
                                                {blog?.title}
                                            </Typography>
                                        </div>
                                        <div className="">
                                            <div>
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-medium"
                                                >
                                                    Published Date:
                                                    <span className="pl-1">
                                                        {blog?.published_date}
                                                    </span>
                                                </Typography>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mt-6">
                                            <Typography
                                                variant="paragraph"
                                                color="blue-gray"
                                            >

                                                {blog?.content}
                                            </Typography>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="lg:col-span-3 xl:col-span-2 bg-gray-200 lg:mx-6 rounded-md order-first lg:order-last">
                        <form onSubmit={handleSearch} className="px-6 py-6 sticky top-32">
                            <Input variant="outlined" label="Search" name="search" />
                            <Button
                                size="sm"
                                className="mt-4"
                                type="submit"
                            >
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;