import { Button, Input, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../api/axiosSecure";
import useDistricts from "../../../hooks/useDistricts";
import useUpazilas from "../../../hooks/useUpazilas";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";


const Profile = () => {
    const inputRef = useRef(null);
    const [districts, districtLoading] = useDistricts();
    const [upazilas, upazilaLoading] = useUpazilas();
    const { user, updateUserProfile } = useAuth();
    const [selectedDistrict, setSelectedDistrict] = useState([])
    const [image, setImage] = useState('');
    
    const { data: currentUser = {}, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`);
            return data;
        }
    })
    
    const handleDistrictChange = async e => {
        const { data } = await axiosSecure.get(`/upazilas/${e.target.value}`)
        setSelectedDistrict(data)
    }

    const handleOnClickImage = () => {
        inputRef.current.click()
    };

    const handleImageChange = e => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodType = form.bloodType.value;
        const currentImage = currentUser?.image;
        const imageFile = image;
        let imgBBData = null
        
        try {
            if (imageFile) {
                const imageData = await imageUpload(imageFile);
                imgBBData = imageData
            }
    
            if (!imgBBData) {
                await updateUserProfile(name)
            }
    
            if (imgBBData) {
                await updateUserProfile(name, imgBBData?.data?.display_url)
            }
            
            const updatedDoc = {
                name,
                email,
                district,
                upazila,
                bloodType,
                image: imgBBData ? imgBBData?.data?.display_url : currentImage
            }

            const { data } = await axiosSecure.patch(`/users/${user?.email}`, updatedDoc);
            if (data?.modifiedCount > 0 || data?.matchedCount > 0) {
                toast.success('Profile has been Updated successfully.');
                refetch()
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="pt-12 pb-32 px-4 lg:px-6 xl:px-12">
            <Helmet>
                <title>Profile || LifeFlow</title>
            </Helmet>
            <Typography color="blue-gray" className="text-center text-2xl lg:text-4xl font-medium mb-7">
                Profile
            </Typography>
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pt-10">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:flex-1">
                        <div onClick={handleOnClickImage} className="border-dashed overflow-hidden border-[2px] w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-96 xl:h-96 border-gray-400 text-center rounded-full flex items-center justify-center mx-auto">
                            {
                                image ?
                                    (
                                        <>
                                            <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover rounded-full" />
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <img src={currentUser?.image} alt="" className="w-full h-full object-cover rounded-full" />
                                        </>
                                    )
                            }
                            <input type="file" ref={inputRef} className="hidden" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="lg:flex-1">
                        <div className="w-full mb-6">
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
                                defaultValue={user?.displayName}
                                required
                            />
                        </div>
                        <div className="w-full mb-6">
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
                                defaultValue={user?.email}
                                disabled
                                required
                            />
                        </div>
                        <div className="w-full mb-6">
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                District
                            </Typography>
                            {
                                !districtLoading && !upazilaLoading ?
                                    <select defaultValue={currentUser?.district} required name="district" onChange={handleDistrictChange} className="w-full py-3 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" >
                                        {
                                            districts?.map((district) => <option className="bg-white" key={district._id} value={`${district?.name}`}>{district.name}</option>)
                                        }
                                    </select>
                                    : ""
                            }
                        </div>
                        <div className="w-full mb-6">
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Upazila
                            </Typography>
                            {
                                !districtLoading && !upazilaLoading ?
                                    <select defaultValue={currentUser?.upazila} required name="upazila" className="w-full py-3 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md">
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
                                    : ""
                            }
                        </div>
                        <div className="w-full mb-6">
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Blood Group
                            </Typography>
                            <select defaultValue={currentUser?.bloodType} name="bloodType" className="w-full py-3 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md" required>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Button type="submit" className="mt-6 bg-red-600" fullWidth>
                    Update Profile
                </Button>
            </form>
        </div>
    );
};

export default Profile;