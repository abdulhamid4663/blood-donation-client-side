import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import { Link } from "react-router-dom";


const BlogSection = () => {

    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/publishedBlogs');
            return data;
        }
    })

    return (
        <div className="py-10 mb-32 max-w-6xl mx-auto">
            <Typography
                color="blue-gray"
                className="text-center mb-12 text-3xl lg:text-5xl font-semibold"
                data-aos="fade-up"
            >
                News & Article
            </Typography>
            <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
                {
                    blogs?.slice(0, 3)?.map(blog => {
                        return (
                            <Card key={blog._id} className="mt-6 flex flex-col">
                                <CardHeader color="blue-gray" className="relative h-56">
                                    <img
                                        src={blog?.thumbnail}
                                        alt="card-image"
                                        className="w-full h-full object-cover"
                                    />
                                </CardHeader>
                                <CardBody className="flex-grow">
                                    <Typography color="blue-gray" className="mb-2 text-sm text-gray-600 font-medium flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {blog?.published_date}
                                    </Typography>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        {blog?.title}
                                    </Typography>
                                    <Typography>
                                        {
                                            blog?.content.length > 150 ? blog?.content.slice(0, 150) + "... " : blog?.content
                                        }
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Link to={`/blog/${blog?._id}`}>
                                        <Button variant="text" className="flex items-center gap-2 text-red-600">
                                            Read More
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                </svg>
                                            </span>
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
            <div data-aos="fade-up" className="mt-12 text-center">
                <Link to='/blog'>
                    <Button>View More</Button>
                </Link>
            </div>
        </div>
    );
};

export default BlogSection;