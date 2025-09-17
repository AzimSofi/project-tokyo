import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function ExpensesIndex() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Expenses', href: '/expenses' }]}>
            <Head title="Expenses Index Page" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {/* ここ */}
                </div>
            </div>
        </AppLayout>
    );
}
