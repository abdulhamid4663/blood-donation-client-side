import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DonationRequestsCard = ({ request }) => {

    return (
        <div>
            <Card className="mt-6 h-[350px] flex flex-col">
                <CardBody className="flex-grow">
                    <Typography color="blue-gray" className="mb-2 text-lg font-medium">
                        Requested By: <span className="text-base font-semibold text-gray-700">{request?.name}</span>
                    </Typography>
                    <Typography color="blue-gray" className="mb-2 text-lg font-medium">
                        Location: <span className="text-base font-semibold text-gray-700">{request?.district}, {request?.upazila}, {request?.hospital}, {request?.address}</span>
                    </Typography>
                    <Typography color="blue-gray" className="mb-2 text-lg font-medium">
                        Date: <span className="text-base font-semibold text-gray-700">{request?.date}</span>
                    </Typography>
                    <Typography color="blue-gray" className="mb-2 text-lg font-medium">
                        Time: <span className="text-base font-semibold text-gray-700">{request?.time}</span>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Link to={`/donation-requests/${request?._id}`}>
                        <Button>View Details</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

DonationRequestsCard.propTypes = {
    request: PropTypes.object,
}

export default DonationRequestsCard;