import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const CsvUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            setError('ファイルを選択してください');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('csv', file);
        router.post('/upload-csv', formData, {
            forceFormData: true,
            onSuccess: () => {
                setSuccess('ファイルが正常にアップロードされました');
            },
            onError: () => {
                setError('ファイルのアップロード中にエラーが発生しました');
            },
            onFinish: () => {
                setLoading(false);
                setFile(null);
            },
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div>
            {success && (
                <Alert variant="default" className="mb-4">
                    <AlertTitle>成功</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>エラー</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-4">
                    <input type="file" accept=".csv" onChange={handleFileChange} className="text-sm" />
                    <Button size="lg" className="px-20" type="submit" disabled={loading}>
                        {loading ? 'アップロード中...' : 'インポート'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CsvUpload;
