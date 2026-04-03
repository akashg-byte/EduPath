import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            // Demo Bypass Check
            if (localStorage.getItem('admin_bypass') === 'true') {
                setIsAdmin(true);
                setLoading(false);
                return;
            }

            if (!user) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (error || data?.role !== 'admin') {
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true);
                }
            } catch (err) {
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            checkAdmin();
        }
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div style={{ 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'var(--bg-dark)',
                color: 'var(--accent)'
            }}>
                <div className="loader">Loading Admin Session...</div>
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default AdminRoute;
