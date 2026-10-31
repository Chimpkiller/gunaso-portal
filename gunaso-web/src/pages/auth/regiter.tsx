import { useState, useEffect } from 'react';


const baseUrl : string = process.env.VITE_API_BASE_URL


interface User {
  id: string;
  name: string;
  email: string;
}


export function UsersRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            const res  = await fetch ('http://local')
        } catch {
            setError(err.messsage);
        }
    }
}
