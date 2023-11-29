import { Helmet } from "react-helmet-async";
import CreateDonationForm from "../../../components/Form/CreateDonationForm";



const CreateDonationRequest = () => {
    return (
        <div>
            <Helmet>
                <title>Create Donation Request || LifeFlow</title>
            </Helmet>
            <CreateDonationForm />
        </div>
    );
};

export default CreateDonationRequest;