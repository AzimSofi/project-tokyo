import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface GeoPosition {
    coords: {
    latitude: number;
    longitude: number;
    };
}

export default function GeoLocation() {
    const [status, setStatus] = useState<HTMLParagraphElement | null>(null);
    const [mapLink, setMapLink] = useState<HTMLAnchorElement | null>(null);

    function geoFindMe() {

        if (mapLink) {
            mapLink.href = '';
            mapLink.textContent = '';
        }

        const success = (position: GeoPosition): void => {
            const latitude: number = position.coords.latitude;
            const longitude: number = position.coords.longitude;

            if (status) status.textContent = '';
            if (mapLink) {
            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink.textContent = `緯度: ${latitude}°、経度: ${longitude}°`;
            }
        }
        const error = (): void => {
            if (status) status.textContent = '位置情報を取得できません';
        }

        // 学んだこと：ブラウザのグローバルオブジェクト、ブラウザ環境で自動的に利用できる
        if (!navigator.geolocation) {
            if (status) status.textContent = 'このブラウザーは位置情報に対応していません';
        } else {
            if (status) status.textContent = '位置情報を取得中…';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    useEffect(() => {
        const statusElement: HTMLParagraphElement | null = document.querySelector('#status');
        if (statusElement) setStatus(statusElement);

        const mapLinkElement: HTMLAnchorElement | null = document.querySelector('#map-link');
        if (mapLinkElement) setMapLink(mapLinkElement);

        const findMeButton: HTMLButtonElement | null = document.querySelector('#find-me');
        if (findMeButton) findMeButton.addEventListener('click', geoFindMe);
    }, []);

    return (
        <div className="row-gap-4 absolute inset-0 flex flex-col items-center justify-center">
            <Button id="find-me" type="submit" size="for-dashboard">
                現在の位置を表示
            </Button>
            <Alert variant="default" className="mb-4 w-96">
                <AlertTitle id="status"></AlertTitle>
                <AlertDescription id="map-link"></AlertDescription>
            </Alert>
        </div>
    );
}
