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
import { Link } from "react-router-dom";

export function Register() {
    const [districts] = useDistricts();
    const [upazilas] = useUpazilas();
    const [selectedDistrict, setSelectedDistrict] = useState([])
    const [enteredPassword, setEnteredPassword] = useState('')
    const [confirmPasswordText, setConfirmPasswordText] = useState('')

    const handleDistrictChange = async e => {
        const { data } = await axiosSecure.get(`/upazilas/${e.target.value}`)
        setSelectedDistrict(data)
    }

    const handleOnBlurPassword = e => {
        setEnteredPassword(e.target.value)
    }

    const handleOnChangePassword = e => {
        if(e.target.value === '') {
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
        const bloodType = form.bloodType.textContent;
        const imageFile = form.image.files[0];
        const district = form.district.value;
        const upazila = form.upazila.value;
        const password = form.password.value;
        const confirmPass = form.confirmPass.value;

        if(password !== confirmPass) {
            alert("password is not matched")
            return;
        }

        if(password.length < 6) {
            // toast.error("password must have at least 6 characters")
            alert('password must have 6 characters')
            return;
        }
        if(!/[A-Z]/.test(password)) {
            // toast.error("password must have at lease one uppercase letter")
            alert('password must have at least one capital character')
            return;
        }
        if(!/[#?!@$%^&*-]/.test(password)) {
            // toast.error("password must have at least one special character")
            alert('password have at least one special character')
            return;
        }

        const user = {
            name, 
            email, 
            bloodType, 
            district, 
            upazila, 
            password, 
            role: 'donor',
            status: 'active'
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card color="transparent" className="w-full" shadow={false}>
                <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full max-w-screen-lg mx-auto ">
                    <Typography variant="h4" color="blue-gray">
                        Register
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <div className="mb-1 flex flex-col gap-6 mt-8">
                        <div className="flex gap-6">
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
                        <div className="flex gap-6">
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
                                    Image
                                </Typography>
                                <Input
                                    type="file"
                                    name="image"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-6">
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
                        <div className="flex gap-6">
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
                        <a href="#" className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

export default Register;