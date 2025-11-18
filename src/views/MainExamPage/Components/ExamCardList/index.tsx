import React from 'react';
import Link from 'next/link';




const ExamCard = ({ title, slug, id, cover_image }) => {

    return (
        <div className="col-md-4 mb-3">
            <Link href={`/exam/${id}/${slug}`} >
                <div className="card hover-card examsCardRow">
                    <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${cover_image}`} width={300} height={300} className="card-img-top" alt={title} />
                    <div className="card-body text-center">
                        <h5 className="fw-bold text-center card-title text-truncate">{title}</h5>
                        {/* <small className="text-blue card-text text-truncate">{formatDate(date)}</small> */}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ExamCard;
