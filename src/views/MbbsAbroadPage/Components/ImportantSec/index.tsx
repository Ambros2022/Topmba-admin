import Link from 'next/link';
import React, { useCallback, useState, useEffect } from 'react';
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

type Tag = {
    id: number;
    country_id: number;
    name: string;
    slug: string;
    country: {
        id: number;
        name: string;
    };
};

const ImportantSec = () => {
    const isMountedRef = useIsMountedRef();
    const [tags, setTags] = useState<Tag[]>([]);

    const getTagsdata = useCallback(async () => {
        try {
            const response = await axios.get('api/website/abroadpages/get');
            if (isMountedRef.current) {
                setTags(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getTagsdata();
    }, [getTagsdata]);

    return (
        <section className='bg-white py-3'>
            <div className="container">
                <h2 className='fw-bold text-blue mb-3'>Important Tags</h2>
                <div className="d-flex gap-3 flex-wrap studyAbroadLink">
                    {tags.map((tag, index) => (
                        <Link key={index} href={`/${tag.slug}`} style={{borderRadius:'50px'}} className='btn p-3 text-black bg-skyBlue'>
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImportantSec;
