import { Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axiosSecure from '../../api/axiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DonationsTable = ({ donation, index, refetch }) => {
    const { _id, recipient, district, upazila, date, time, status } = donation;

    const handleDelete = async () => {
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

                try {
                    const { data } = await axiosSecure.delete(`/requests/${_id}`);
                    if (data?.deletedCount > 0) {
                        toast.success('Request has been deleted!');
                        refetch();
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
        });
    };

    const handleStatusChange = async (value) => {
        const requestDoc = {
            name: donation?.name,
            email: donation?.email,
            recipient: donation?.recipient,
            district: donation?.district,
            upazila: donation?.upazila,
            hospital: donation?.hospital,
            address: donation?.address,
            bloodType: donation?.bloodType,
            date: donation?.date,
            time: donation?.time,
            message: donation?.message,
            status: value
        }

        try {
            const { data } = await axiosSecure.patch(`/requestStatusChange/${_id}`, requestDoc)
            if (data?.modifiedCount > 0) {
                toast.success('Thank you for Donating');
                refetch();
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr key={donation._id} className='bg-gray-50 '>
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
                    {recipient}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {district}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {upazila}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {date}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {time}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="red"
                    className="font-normal pl-4 py-2"
                >
                    {status}
                </Typography>
            </td>
            <td className='flex items-center gap-2 py-4 pl-4'>
                {
                    status === "done" || status === "canceled" ? ""
                        :
                        <>
                            {
                                status === "inprogress"
                                &&
                                <>
                                    <Button
                                        color='green'
                                        className='py-1 px-2'
                                        onClick={() => handleStatusChange('done')}
                                    >
                                        Done
                                    </Button>
                                    <Button
                                        color='orange'
                                        className='py-1 px-2'
                                        onClick={() => handleStatusChange('canceled')}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            }
                        </>
                }
                <Link to={`/dashboard/updateRequest/${_id}`}>
                    <Button
                        color='light-green'
                        className='py-1 px-2'

                    >
                        Update
                    </Button>
                </Link>
                <Button
                    color='red'
                    className='py-1 px-2'
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
};

DonationsTable.propTypes = {
    donation: PropTypes.object,
    index: PropTypes.number,
    refetch: PropTypes.func,
}

export default DonationsTable;