import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner";
import Contact from "../../components/Home/Contact";
import Features from "../../components/Home/Features";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || LifeFlow</title>
            </Helmet>
            <Banner />
            <Features />
            <Contact />
        </div>
    );
};

export default Home;