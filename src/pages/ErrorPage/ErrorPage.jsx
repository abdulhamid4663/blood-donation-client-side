import { Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError()

    console.log(error)
    return (
        <div>
            <Helmet>
                <title>404 Not Fount</title>
            </Helmet>
            <div className="min-h-screen flex justify-center items-center px-6">
                <div className="text-center">
                    <Typography
                        className="text-5xl md:text-7xl lg:text-9xl mb-2"
                    >
                        {error.status}
                    </Typography>
                    <Typography
                        className="text-2xl md:text-3xl lg:text-4xl mb-6"
                    >
                        {error.statusText}
                    </Typography>
                    <Typography
                        className="text-lg md:text-xl font-medium mb-2"
                    >
                        Oops! The page you&apos;re looking for is not here.
                    </Typography>
                    <Typography
                        className="max-w-xl text-sm md:text-base"
                    >
                        Navigate back to our homepage using the homepage button. For assistance, contact our <span className="font-bold underline cursor-pointer hover:no-underline">support</span> team. Thanks for your understanding!
                    </Typography>
                    <div>
                        <Link to='/'>
                            <button className="py-3 px-5 bg-red-600 text-white text-sm mt-4">
                                Go to homepage
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;