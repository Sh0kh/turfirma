import { useEffect, useState } from "react";
import { $api } from "../../utils";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllUsers = async () => {
        try {
            const response = await $api.get('/customer/getStatistics');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getAllUsers()
    },[])

    return (
        <>

        </>
    )
}