import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

const CsvUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('csv', file);
        router.post('/upload-csv', formData, { forceFormData: true });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                <Button size="lg" className="px-20" type="submit">
                    インポート
                </Button>
            </form>
        </div>
    );
};

export default CsvUpload;
