import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import useDistricts from "../../hooks/useDistricts";
import useUpazilas from "../../hooks/useUpazilas";
import axiosSecure from "../../api/axiosSecure";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export function Register() {
    const [districts] = useDistricts();
    const [upazilas] = useUpazilas();
    const { createUser, updateUserProfile } = useAuth();
    const [selectedDistrict, setSelectedDistrict] = useState([])
    const [enteredPassword, setEnteredPassword] = useState('')
    const [confirmPasswordText, setConfirmPasswordText] = useState('')
    const navigate = useNavigate();

    const handleDistrictChange = async e => {
        const { data } = await axiosSecure.get(`/upazilas/${e.target.value}`)
        setSelectedDistrict(data)
    }

    const handleOnBlurPassword = e => {
        setEnteredPassword(e.target.value)
    }

    const handleOnChangePassword = e => {
        if (e.target.value === '') {
            setConfirmPasswordText('')
            return
        }

        if (e.target.value !== enteredPassword) {
            setConfirmPasswordText('Password is not Matched.')
        } else {
            setConfirmPasswordText('')
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const bloodType = form.bloodType.innerText;
        const role = form.role.innerText;
        const imageFile = form.image.files[0];
        const district = form.district.value;
        const upazila = form.upazila.value;
        const password = form.password.value;
        const confirmPass = form.confirmPass.value;

        if (password !== confirmPass) {
            toast.error("Confirm password is not matched")
            return;
        }

        if (password.length < 6) {
            // toast.error("password must have at least 6 characters")
            toast.error('password must have 6 characters')
            return;
        }
        if (!/[A-Z]/.test(password)) {
            // toast.error("password must have at lease one uppercase letter")
            toast.error('password must have at least one capital character')
            return;
        }
        if (!/[#?!@$%^&*-]/.test(password)) {
            // toast.error("password must have at least one special character")
            toast.error('password have at least one special character')
            return;
        }
        try {
            const imageData = await imageUpload(imageFile);
            // eslint-disable-next-line no-unused-vars
            const res = await createUser(email, password)
            await updateUserProfile(name, imageData?.data?.display_url)

            const user = {
                name,
                email,
                bloodType,
                district,
                image: imageData?.data?.display_url,
                upazila,
                role,
                status: 'active'
            }

            const { data } = await axiosSecure.put(`/users/${email}`, user);
            console.log(data);
            toast.success('SignUp Successful');
            navigate('/');

        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div>
            <Helmet>
                <title>Register || LifeFlow</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen">
                <Card color="transparent" className="w-full px-6 md:px-4 py-8" shadow={false}>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full max-w-screen-lg mx-auto ">
                        <Typography variant="h4" color="blue-gray">
                            Register
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Nice to meet you! Enter your details to register.
                        </Typography>
                        <div className="mb-1 flex flex-col gap-6 mt-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Your Name
                                    </Typography>
                                    <Input
                                        name="name"
                                        size="lg"
                                        placeholder="John Doe"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Your Email
                                    </Typography>
                                    <Input
                                        type="email"
                                        name="email"
                                        size="lg"
                                        placeholder="name@mail.com"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Blood Group
                                    </Typography>
                                    <Select name="bloodType" size="md" label="Select Blood Group" required>
                                        <Option value="a+">A+</Option>
                                        <Option value="a-">A-</Option>
                                        <Option value="b+">B+</Option>
                                        <Option value="b-">B-</Option>
                                        <Option value="ab+">AB+</Option>
                                        <Option value="ab-">AB-</Option>
                                        <Option value="o+">O+</Option>
                                        <Option value="o-">O-</Option>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Role
                                    </Typography>
                                    <Select name="role" size="md" label="Select Your Role" required>
                                        <Option value="volunteer">volunteer</Option>
                                        <Option value="donor">donor</Option>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Image
                                    </Typography>
                                    <Input
                                        type="file"
                                        name="image"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Districts
                                    </Typography>

                                    <select required name="district" onChange={handleDistrictChange} className="w-full py-2 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md" label="Select District">
                                        {
                                            districts?.map((district) => <option className="bg-white" key={district._id} value={`${district?.name}`}>{district.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Upazilas
                                    </Typography>
                                    <select required name="upazila" className="w-full py-2 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md" label="Select District">
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
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Password
                                    </Typography>
                                    <Input
                                        name="password"
                                        type="password"
                                        size="lg"
                                        placeholder="********"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onBlurCapture={handleOnBlurPassword}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Confirm Password
                                    </Typography>
                                    <Input
                                        name="confirmPass"
                                        type="password"
                                        size="lg"
                                        placeholder="********"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onBlurCapture={handleOnChangePassword}
                                        required
                                    />
                                    {
                                        confirmPasswordText ?
                                            <Typography
                                                variant="small"
                                                color="red"
                                            >
                                                {confirmPasswordText}
                                            </Typography> : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <Checkbox
                            name="box"
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <Link
                                        className="font-medium transition-colors hover:text-gray-900"
                                    >
                                        &nbsp;Terms and Conditions
                                    </Link>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button type="submit" className="mt-6" fullWidth>
                            sign up
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to='/signIn' className="font-medium text-gray-900">
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Register;