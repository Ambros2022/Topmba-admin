import { ReactNode, useCallback, useEffect, useState } from 'react'
// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import { useRouter } from 'next/router';
import Spinner from 'src/@core/components/spinner';
import AbroadUniversity from 'src/views/AbroadUniversity'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';

const college = () => {
    const router = useRouter();
    const [isRouterReady, setIsRouterReady] = useState(false);
    const isMountedRef = useIsMountedRef();
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady]);

    const getPageData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`api/website/abroadpagefindone/get/study-in-ireland`);
            if (isMountedRef.current) {
                setPageData(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            if (isMountedRef.current) {
                setError('Failed to fetch page data');
                setLoading(false);
            }
            console.error('Failed to fetch page data:', error);
            router.push("/404");
        }
    }, [isMountedRef, router]);

    useEffect(() => {
        getPageData();
    }, [getPageData]);

    if (!isRouterReady || loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }
    if (!isRouterReady) {
        return <Spinner /> // Or a loading spinner
    }

    return <>

        {Array.isArray(router.query.slug) && (
            router.query.slug.length <= 2 &&
            <AbroadUniversity id={router.query.slug[0]} Countrydata={pageData} />

        )}
    </>
}

college.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

college.guestGuard = true

export default college
