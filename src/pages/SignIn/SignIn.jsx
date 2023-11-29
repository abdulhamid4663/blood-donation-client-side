import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

function SignIn() {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const captcha = form.captcha.value;

        if (validateCaptcha(captcha) !== true) {
            toast.error('Captcha is not Matched');
            form.captcha.value = ''
            return;
        }

        try {
            await loginUser(email, password);
            toast.success('Sign In Successful');
            navigate(from, { replace: true });

        } catch (error) {
            toast.error(error.message);
        }

    }

    return (
        <div>
            <Helmet>
                <title>Sign In || LifeFlow</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen">
                <Card color="transparent" className="py-8 px-6 md:px-4" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Sign In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal max-w-sm">
                        Welcome back! Enter your email and password to sign in.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 max-w-screen-lg">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                name="email"
                                type="email"
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Captcha
                            </Typography>
                            <div>
                                <LoadCanvasTemplate />
                            </div>
                            <Input
                                size="lg"
                                name="captcha"
                                placeholder="Type Captcha Here..."
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <Button type="submit" className="mt-6" fullWidth>
                            Sign In
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don&apos;t have an account?{" "}
                            <Link to='/register' className="font-medium text-gray-900">
                                Register
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default SignIn;