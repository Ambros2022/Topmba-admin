import React, { useEffect, useState, useCallback } from 'react';
import axios1 from 'src/configs/axios';

import MainCarousel2 from 'src/@core/components/carousel2';
import Link from 'next/link';

interface Item {
    upcoming_date: any;
    slug: string;
    id: number;
    title: string;
    date: string;
}

function PopularCourses() {
    const [items, setItems] = useState<Item[]>([]);
    const [isMountedRef, setIsMountedRef] = useState(true);

    const getExamData = useCallback(async () => {
        try {
            const response = await axios1.get('/api/website/exams/get?orderby=desc&columnname=upcoming_date');
            if (response.data.status === 1) {
                // Map and format exam data
                const currentDate = new Date(); // Get the current date and time
                const examData: Item[] = response.data.data.map((exam: any) => ({
                    id: exam.id,
                    title: exam.exam_title,
                    slug: exam.slug,
                    date: formatDate(exam.upcoming_date), // Format the date here
                    upcoming_date: new Date(exam.upcoming_date) // Parse for filtering and sorting
                }));

                // Filter out exams with a date before the current date
                const upcomingExams = examData.filter(exam => exam.upcoming_date >= currentDate);

                // Sort exams by the upcoming_date in ascending order
                const sortedData = upcomingExams.sort((a, b) => a.upcoming_date.getTime() - b.upcoming_date.getTime());

                if (isMountedRef) {
                    setItems(sortedData);
                }
            } else {
                console.error('Failed to fetch exam data');
            }
        } catch (error) {
            console.error('Error fetching exam data:', error);
        }
    }, [isMountedRef]);



    useEffect(() => {
        getExamData();

        return () => {
            setIsMountedRef(false); // Cleanup on unmount
        };
    }, [getExamData]);

    // Function to format the date
    function formatDate(dateString: string): string {
        const date = new Date(dateString);

        // Determine the day and its suffix
        const day = date.getDate();
        const daySuffix = (n: number) => {
            if (n >= 11 && n <= 13) return 'th';
            switch (n % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        const suffix = daySuffix(day);

        // Get the month name and year
        const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
        const [month, year] = date.toLocaleDateString('en-US', options).split(' ');

        // Return formatted date
        // return `${day}${suffix} ${month} `;
        return `${day}${suffix} ${month} ${year}`;
    }

    // Function to create card components
    function createCards() {
        return items.map(card => (
            <CardComponent
                key={card.id}
                id={card.id}
                title={card.title}
                slug={card?.slug}
                date={card.date}
            />
        ));
    }

    // CardComponent function
    function CardComponent({ id, title, date, slug }: { id: number; title: string; date: string, slug: string }) {
        return (
            <div className='topCourseConCarousel'>
                <Link href={`/exam/${id}/${slug}`} className='stretch-link'>
                    <div className="card text-center hover-card bg-skyBlue d-flex mx-2 border-0">

                        <div className="row flex-fill">
                            <div className="col-12 text-center text-md-start px-0">
                                <div className="ms-2 card-body">
                                    <h4 className="card-title fw-bold text-blue text-truncate">{title}</h4>
                                    <h6 className="card-title  mainText flex-fill text-truncate text-black">{date}</h6>
                                </div>
                            </div>
                        </div>

                    </div>
                </Link>
            </div>
        );
    }

    return (
        <section className=''>
            <div className="topCarouselCardsCon bg-examsCarouselCr examsCardCarousel px-5 pt-3 pb-3 position-relative" style={{ zIndex: '2' }}>
                <MainCarousel2 items={createCards()} />
            </div>
        </section>
    );
}

export default PopularCourses;
