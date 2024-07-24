import Dashboard from '@/pages/Dashboard';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { useAuth } from '../context/AuthContext';

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
});
