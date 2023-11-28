import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import axiosSecure from "../../api/axiosSecure";
import { useEffect, useState } from "react";


const CheckoutForm = () => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const [paymentAmount, setPaymentAmount] = useState('');

    useEffect(() => {
        if (paymentAmount) {
            axiosSecure.post('/create-payment-intent', { paymentAmount })
                .then(res => {
                    setClientSecret(res?.data?.clientSecret)
                })
        }
    }, [paymentAmount])

    const handleSubmit = async e => {
        e.preventDefault();
        const paymentAmount = e.target.paymentAmount.value

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            toast.error(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log("confirm Error", confirmError);
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {

                // save the payment in database
                const paymentInfo = {
                    email: user?.email,
                    amount: paymentAmount,
                    transactionId: paymentIntent.id,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                }

                const res = await axiosSecure.post('/payments', paymentInfo);
                if (res?.data?.insertedId) {
                    toast.success('You have donated successfully')
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border-2 border-gray-300 py-6 px-4 rounded-xl">
            <div className="mb-6 flex border-2 border-gray-500 gap-4">
                <div className="bg-gray-300 py-2 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <input name="paymentAmount"  className=" text-xl w-full focus:border-none active:border-none focus:outline-none" onBlur={(e) => setPaymentAmount(e.target.value)} onKeyDown={(e) => {
                    if (
                        !/^[0-9\b]+$/.test(e.key) &&
                        !['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace', 'Tab'].includes(e.key)
                    ) {
                        e.preventDefault();
                    }
                }} />
            </div>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#000000',
                            '::placeholder': {
                                color: '#282828',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="text-center mt-6">
                <Button variant="filled" color="red" type="submit" disabled={!stripe}>
                    Pay
                </Button>
            </div>
        </form>
    );
};

export default CheckoutForm;