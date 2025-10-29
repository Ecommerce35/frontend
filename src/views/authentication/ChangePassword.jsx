import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../api/api';

const ChangePassword = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savedTime, setSavedTime] = useState('');
    const [savedId, setSavedUserId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const uidb64 = searchParams.get('uidb64');
    const token = searchParams.get('token');

    // Utility function to show alerts
    const Alert = (icon, title, text) => Swal.fire({
        icon,
        title,
        text,
    });

    // Fetch user ID and OTP expiration time from localStorage
    useEffect(() => {
       
    }, []);

    // Validate password and confirmation match
    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return false;
        }
        if (password.length < 8) {
            setError("Password should be at least 8 characters long");
            return false;
        }
        setError('');
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validatePasswords()) {
            return;
        }

        try {
            const response = await api.post(`api/v1/auth/password-reset-confirm/${uidb64}/${token}/`, {
                password,
                confirm_password: confirmPassword
            });            

            if (response) {
                setError('')
                Alert('success', 'Password Changed', 'Your password has been successfully updated.');
                navigate('/auth/email');
            } else{
                setError(response.error);
                Alert('error', 'Server Error', response.error);
            }
        } catch (err) {
            Alert('error', 'Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    return (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Change Password</h1>
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                    {savedId}
                </div>

                <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="password" className="sr-only">New Password</label>
                        <div className="relative">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-m shadow-sm"
                                placeholder="Enter new password"
                                required
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-4 grid place-content-center cursor-pointer text-gray-400"
                            >
                                {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V6a4 4 0 10-8 0v4" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <div className="relative">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={passwordVisible ? "text" : "password"}
                                value={confirmPassword}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-m shadow-sm"
                                placeholder="Confirm new password"
                                required
                            />

                            <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-4 grid place-content-center cursor-pointer text-gray-400">
                                {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V6a4 4 0 10-8 0v4" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </span>

                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            No account? <Link className="underline" to="/register/">Sign up</Link>
                        </p>
                        <button
                            type="submit"
                            className={`inline-block rounded-lg px-5 py-3 text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                            ) : 'Change Password'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img
                    alt="Password Change Background"
                    src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </section>
    );
};

export default ChangePassword;
