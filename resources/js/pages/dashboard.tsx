import CsvUpload from '@/components/project-tokyo/csv-upload';
import Geolocation from '@/components/project-tokyo/geolocation';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const [locationText, setLocationText] = useState<string>('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CsvUpload />
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Geolocation onLocationChange={location => setLocationText(location ? `${location.latitude}, ${location.longitude}` : '')}/>
                        <Button className="absolute bottom-4 right-4" size="lg" variant="save"
                            onClick={async () => { // 関数として渡さないと、すぐ実行されてしまうとonClickはPromiseを返せないのでasyncにする
                                try {
                                    await router.post('/save-location', { location: locationText })
                                } catch (error) {
                                    console.error('位置情報の保存中にエラーが発生しました:', error)
                                }
                            }}
                            >
                            保存
                        </Button>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
