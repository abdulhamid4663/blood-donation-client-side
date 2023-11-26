import { Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const DonationsTable = ({ donation, index }) => {
    const { _id, recipient, district, upazila, date, time, status } = donation;

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
                    color="blue-gray"
                    className="font-normal pl-4 py-2"
                >
                    {status}
                </Typography>
            </td>
            <td className='flex items-center gap-2 py-2 pl-4'>
                {
                    status === "inProgress"
                    &&
                    <>
                        <Button
                            color='green'
                            className='py-1 px-2'
                        >
                            Done
                        </Button>
                        <Button
                            color='orange'
                            className='py-1 px-2'
                        >
                            Cancel
                        </Button>
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
}

export default DonationsTable;