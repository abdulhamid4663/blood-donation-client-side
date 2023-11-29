import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.config";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axiosSecure from "../api/axiosSecure";
import { clearCookie } from "../api/auth";


export const AuthContext = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const userLogout = async () => {
        setLoading(true)
        await clearCookie();
        return signOut(auth);
    }

    const updateUserProfile = async (name, image) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: name, photoURL: image
            });
        } catch (error) {
            console.error("Failed to update profile: ", error);
        } finally {
            setLoading(false);
        }
    }

    const loginWIthGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email

            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);

            if (currentUser) {
                axiosSecure.post('/jwt', { email: userEmail })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        });

        return () => {
            return unSubscribe();
        }
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        updateUserProfile,
        userLogout,
        loginWIthGoogle,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;