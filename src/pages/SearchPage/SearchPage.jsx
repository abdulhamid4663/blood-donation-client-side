import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Option, Select,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import useDistricts from "../../hooks/useDistricts";
import useUpazilas from "../../hooks/useUpazilas";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

// ○ search button
const SearchPage = () => {
    const [districts] = useDistricts();
    const [upazilas] = useUpazilas();
    const [selectedDistrict, setSelectedDistrict] = useState([])
    const [searchDistrict, setSearchDistrict] = useState('')
    const [searchUpazila, setSearchUpazila] = useState('')
    const [searchBloodType, setSearchBloodType] = useState('')
    const [userData, setUserData] = useState([])
    const [messageUser, setMessageUser] = useState({})
    const { user } = useAuth();

    const [size, setSize] = useState(null);

    const handleOpen = (value) => setSize(value);

    const getUser = (user) => setMessageUser(user)

    const handleSendMessage = async e => {
        e.preventDefault();
        const message = e.target.message.value;
        const phone = e.target.phone.value;

        const info = {
            name: user?.displayName,
            from: user?.email,
            to: messageUser?.email,
            phone: phone,
            message: message,
        }

        try {
            const { data } = await axiosSecure.post('/sendMessage', info)
            if (data?.success) {
                toast.success('message send successfully')
                handleOpen(null)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const handleDistrictChange = async value => {
        const { data } = await axiosSecure.get(`/upazilas/${value}`)
        setSelectedDistrict(data)
    }
    console.log(messageUser);
    const handleSearch = async (e) => {
        e.preventDefault()
        const bloodType = encodeURIComponent(searchBloodType);
        const district = searchDistrict;
        const upazila = searchUpazila;

        const { data } = await axiosSecure.get(`/searchUser?donor=donor&bloodType=${bloodType}&district=${district}&upazila=${upazila}`)
        setUserData(data)
    }

    return (
        <div className="bg-gray-200">
            <Helmet>
                <title>Search Donor || LifeFlow</title>
            </Helmet>
            <div className="pt-12 pb-32 max-w-7xl mx-auto px-6 md:px-4">
                <Typography color="blue-gray" className="text-center text-2xl lg:text-4xl font-medium mb-7">
                    Search Donor
                </Typography>
                <div className="bg-gray-300 py-6 rounded-xl">
                    <form onSubmit={handleSearch}>
                        <div className="flex">
                            <div className="mb-1 flex flex-col gap-6 mt-8 w-full px-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full">
                                        <Typography variant="h6" color="blue-gray" className="mb-3">
                                            Blood Group
                                        </Typography>
                                        <Select onChange={(e) => setSearchBloodType(e)} name="bloodType" size="md" label="Select Blood Group" >
                                            <Option value="A+">A+</Option>
                                            <Option value="A-">A-</Option>
                                            <Option value="B+">B+</Option>
                                            <Option value="B-">B-</Option>
                                            <Option value="AB+">AB+</Option>
                                            <Option value="AB-">AB-</Option>
                                            <Option value="O+">O+</Option>
                                            <Option value="O-">O-</Option>
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        <Typography variant="h6" color="blue-gray" className="mb-3">
                                            District
                                        </Typography>

                                        <select name="district" onChange={(e) => { setSearchDistrict(e.target.value); handleDistrictChange(e.target.value) }} className="w-full py-2 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md" label="Select District">
                                            {
                                                districts?.map((district) => <option className="bg-white" key={district._id} value={`${district?.name}`}>{district.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <Typography variant="h6" color="blue-gray" className="mb-3">
                                            Upazila
                                        </Typography>
                                        <select onChange={(e) => setSearchUpazila(e.target.value)} name="upazila" className="w-full py-2 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md" label="Select District">
                                            {
                                                selectedDistrict?.length > 0
                                                    ?
                                                    <>
                                                        {
                                                            selectedDistrict?.map((upazila) => <option className="bg-white" key={upazila._id} value={`${upazila?.name}`}>{upazila.name}</option>)
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            upazilas?.map((upazila) => <option className="bg-white" key={upazila._id} value={`${upazila?.name}`}>{upazila.name}</option>)
                                                        }
                                                    </>
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button type="submit" className="mt-6">
                                Search
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="mt-8">
                    {/* USER SEARCHED INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            userData?.map(user => {
                                return (
                                    <Card key={user?._id} className="">
                                        <CardHeader floated={false} className="h-80">
                                            <img src={user?.image} alt="profile-picture" className="w-full h-full" />
                                        </CardHeader>
                                        <CardBody className="text-center">
                                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                                {user?.name}
                                            </Typography>
                                            <Typography color="blue-gray" className="font-medium" textGradient>
                                                {user?.email}
                                            </Typography>
                                        </CardBody>
                                        <CardFooter className="flex flex-col justify-center gap-7 pt-2">
                                            <div className="flex justify-center gap-7">
                                                <Typography
                                                    as="li"
                                                    className="text-center"
                                                >
                                                    Blood Type: <span className="text-center text-gray-800 font-medium">{user?.bloodType}</span>
                                                </Typography>
                                                <Typography
                                                    as="li"
                                                    className="text-center"
                                                >
                                                    District: <span className="text-center text-gray-800 font-medium">{user?.district}</span>
                                                </Typography>
                                                <Typography
                                                    as="li"
                                                    className="text-center"
                                                >
                                                    Upazila: <span className="text-center text-gray-800 font-medium">{user?.upazila}</span>
                                                </Typography>
                                            </div>
                                            <Button onClick={() => { handleOpen("md"); getUser(user) }} variant="gradient">
                                                Send Message
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })
                        }
                    </div>
                    <Dialog
                        open={
                            size === "xs" ||
                            size === "sm" ||
                            size === "md" ||
                            size === "lg" ||
                            size === "xl" ||
                            size === "xxl"
                        }
                        size={size || "md"}
                        handler={handleOpen}
                    >

                        <DialogHeader className="justify-center pt-6 text-3xl">Contact with {messageUser?.name}</DialogHeader>
                        <form onSubmit={handleSendMessage}>
                            <DialogBody>
                                <div className="flex flex-col gap-6 px-6">
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Your Name
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Your Name"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        defaultValue={user?.displayName}
                                        disabled
                                    />
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Your Email
                                    </Typography>
                                    <Input
                                        type="email"
                                        size="lg"
                                        placeholder="name@mail.com"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        defaultValue={user?.email}
                                        disabled
                                    />
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Your Phone
                                    </Typography>
                                    <Input
                                        size="lg"
                                        name="phone"
                                        placeholder="+880555500001"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Message
                                    </Typography>
                                    <Textarea
                                        size="lg"
                                        name="message"
                                        placeholder="Message Here..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={() => handleOpen(null)}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    type="submit"
                                >
                                    <span>Send</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;