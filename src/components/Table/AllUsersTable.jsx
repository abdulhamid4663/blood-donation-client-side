import { Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Button } from "@material-tailwind/react";
import axiosSecure from '../../api/axiosSecure';
import toast from 'react-hot-toast';
import useRole from '../../hooks/useRole';
import Swal from 'sweetalert2';

const AllUsersTable = ({ user, index, refetch }) => {
    const { _id, image, name, email, status, role } = user;
    const { userRole } = useRole();

    const handleBlock = async () => {
        try {
            const { data } = await axiosSecure.patch(`/blockUser/${_id}`)
            if (data?.modifiedCount > 0 || data?.matchedCount > 0) {
                toast.success('User is Blocked Successfully');
                refetch();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleUnblock = async () => {
        try {
            const { data } = await axiosSecure.patch(`/activeUser/${_id}`)
            if (data?.modifiedCount > 0 || data?.matchedCount > 0) {
                toast.success('User is Unblocked Successfully');
                refetch();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleRoleChange = async (e) => {

        const updatedRole = {
            role: e.target.value
        }
        if (e.target.value === "admin") {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Make Admin"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await axiosSecure.patch(`/changeRole/${_id}`, updatedRole)
                        if (data?.modifiedCount > 0 || data?.matchedCount > 0) {
                            toast.success(`${name} is Admin Now!`);
                            refetch();
                            return;
                        }
                    } catch (error) {
                        toast.error(error.message);
                    }
                }
            });
        } 

        if (e.target.value === "volunteer" || e.target.value === 'donor') {
            try {
                const { data } = await axiosSecure.patch(`/changeRole/${_id}`, updatedRole)
                if (data?.modifiedCount > 0 || data?.matchedCount > 0) {
                    toast.success('User role changed successfully');
                    refetch();
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <tr key={user._id} className='bg-gray-50 '>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {index + 1}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    <img src={image} alt="" className='w-10 h-10 object-cover rounded-lg' />
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {name}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {email}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {status}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {role}
                </Typography>
            </td>
            <td className='flex items-center gap-2 py-4 pl-4'>
                {
                    user?.role !== userRole ? <>
                        <Button
                            color='red'
                            className='py-1 px-2'
                            onClick={handleBlock}
                        >
                            Block
                        </Button>
                        <Button
                            color='light-green'
                            className='py-1 px-2'
                            onClick={handleUnblock}
                        >
                            Unblock
                        </Button>
                    </>
                        :
                        <span className='text-xs font-medium'>Can&apos;t block/unblock the admin</span>
                }
            </td>
            <td className='pl-4'>
                {
                    role === "admin" ? <span className='text-xs font-medium'>Can&apos;t Change Admin&apos;s Role</span> :
                        <select onChange={handleRoleChange} defaultValue={user?.role} className='bg-transparent py-2 px-3 text-sm'>
                            <option value='default' disabled className='text-xs'>Select Role</option>
                            <option value='volunteer'>Volunteer</option>
                            <option value='donor'>Donor</option>
                            <option value='admin'>Admin</option>
                        </select>
                }
            </td>
        </tr>
    );
};

AllUsersTable.propTypes = {
    user: PropTypes.object,
    index: PropTypes.number,
    refetch: PropTypes.func
}

export default AllUsersTable;