import { useEffect, useState } from 'react';
import { setUser } from "../api/auth";


const MainWrapper = ({ children }) => {
    // Initialize the 'loading' state variable and set its initial value to 'true'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const handler = async () => {
        setLoading(true);
        await setUser();
        setLoading(false);
    };
    handler();
    }, []);

    // Render content conditionally based on the 'loading' state
    return <>{loading ? null : children}</>;
};

export default MainWrapper;
