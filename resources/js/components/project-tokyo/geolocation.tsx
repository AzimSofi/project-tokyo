import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

type GeoLocationProps = {
    onLocationChange: (location: { latitude: number; longitude: number } | null) => void;
};

export default function GeoLocation({ onLocationChange }: GeoLocationProps) {
    const [statusText, setStatusText] = useState<string>('');
    const [mapLinkHref, setMapLinkHref] = useState<string>('');
    const [mapLinkText, setMapLinkText] = useState<string>('');

    function geoFindMe() {
        setMapLinkHref('');
        setMapLinkText('');

        const success = (position: GeolocationPosition): void => {
            const latitude: number = position.coords.latitude;
            const longitude: number = position.coords.longitude;

            setStatusText('');
            setMapLinkHref(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
            setMapLinkText(`緯度: ${latitude}°、経度: ${longitude}°`);
            onLocationChange({ latitude, longitude });
        }
        const error = (): void => {
            setStatusText('位置情報を取得できません');
        }

        // 学んだこと：ブラウザのグローバルオブジェクト、ブラウザ環境で自動的に利用できる
        if (!navigator.geolocation) {
            setStatusText('このブラウザーは位置情報に対応していません');
        } else {
            setStatusText('位置情報を取得中…');
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return (
        <div className="gap-y-4 absolute inset-0 flex flex-col items-center justify-center">
            <Button id="find-me" type="button" size="for-dashboard" onClick={geoFindMe}>
                現在の位置を表示
            </Button>
            <Alert variant="default" className="mb-4 w-96" hidden={!mapLinkText}>
                <AlertTitle id="status" hidden={!statusText}>{statusText}</AlertTitle>
                <AlertDescription id="map-link">
                    {mapLinkHref ? (
                        <a href={mapLinkHref} target="_blank" rel="noopener noreferrer" className='flex items-center'>
                            <div className='text-center'>
                                {mapLinkText.split('、')[0] ?? ''}
                            </div>
                            <div className='text-center'>
                                {mapLinkText.split('、')[1] ?? ''}
                            </div>
                        </a>
                    ) : null}
                </AlertDescription>
            </Alert>
        </div>
    );
}
