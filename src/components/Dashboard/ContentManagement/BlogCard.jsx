import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import axiosSecure from '../../../api/axiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useRole from '../../../hooks/useRole';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, refetch }) => {
    const { user } = useAuth();
    const { userRole } = useRole();
    const { _id, name, image, title, content, thumbnail, status } = blog;

    const handlePublishChange = async (value) => {
        const updatedDoc = {
            status: value
        }

        try {
            const { data } = await axiosSecure.patch(`/blogs/${_id}?email=${user?.email}`, updatedDoc)
            if (data?.matchedCount > 0) {
                toast.success(`${title} ${value === "published" ? value : "unPublished"}`)
                refetch();
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDeleteBlog = async () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const { data } = await axiosSecure.delete(`/blogs/${_id}`)
                    if (data?.deletedCount > 0) {
                        toast.success(`${title} has been deleted!`)
                        refetch();
                    }

                }
            });

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div>
                <Card className="overflow-hidden">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 rounded-none relative"
                    >
                        <img
                            src={thumbnail}
                        />
                        <div className='absolute w-full px-4 top-4 justify-between flex'>

                            <div className='flex flex-col gap-2'>
                                {
                                    userRole === "admin" &&
                                    <>
                                        <Button
                                            size='sm'
                                            color='red'
                                            onClick={handleDeleteBlog}
                                        >
                                            Delete
                                        </Button>
                                        <Link to={`/dashboard/content-management/${_id}`}>
                                            <Button
                                                size='sm'
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                    </>
                                }

                            </div>

                            {
                                userRole === "admin" &&
                                <>
                                    {
                                        status === "published" ?
                                            <div>
                                                <Button
                                                    size='sm'
                                                    onClick={() => handlePublishChange("draft")}
                                                >
                                                    UnPublish
                                                </Button>
                                            </div>
                                            :
                                            <div>
                                                <Button
                                                    size='sm'
                                                    onClick={() => handlePublishChange('published')}
                                                >
                                                    Publish
                                                </Button>
                                            </div>
                                    }
                                </>
                            }
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h4" color="blue-gray">
                            {title}
                        </Typography>
                        <Typography variant="lead" color="gray" className="mt-3 font-normal">
                            {content.length > 120 ? content.slice(0, 120) + "..." : content}
                        </Typography>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between">

                        <div className="flex items-center space-x-2">
                            <Tooltip content="Natali Craig">
                                <Avatar
                                    size="sm"
                                    variant="circular"
                                    src={image}
                                    className="border-2 border-white hover:z-10"
                                />
                            </Tooltip>
                            <Typography>
                                {name}
                            </Typography>
                        </div>
                        <Typography className="font-normal">Status: <span className='text-gray-900 font-medium'>{status}</span></Typography>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object,
    refetch: PropTypes.func,
}

export default BlogCard;