// ** MUI Imports
import { ReactNode, useCallback, useEffect, useState } from 'react';
import Spinner from 'src/@core/components/spinner';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/adminaxios';
import Link from 'next/link';
import { BsFileBarGraphFill, BsCardHeading, BsBuilding, BsBank, BsBank2, BsBookHalf, BsBorderWidth, BsAirplaneEnginesFill, BsFillPassFill, BsBlockquoteLeft, BsFillPersonLinesFill, BsFillPostageFill, BsFillPipFill, BsFillJournalBookmarkFill } from "react-icons/bs";

// Define types for pagedata
interface PageData {
  Published_colleges?: number;
  Total_colleges?: number;
  Published_universities?: number;
  Total_universitys?: number;
  Published_school?: number;
  school?: number;
  stream?: number;
  generalcourse?: number;
  Published_courses?: number;
  courses?: number;
  abroadpages?: number;
  Published_exam?: number;
  exam?: number;
  enquiry?: number;
  Published_blog?: number;
  blog?: number;
  schoolboards?: number;
  Published_scholarships?: number;
  scholarships?: number;
  jobs_positions?: number;
  Total_news?: number;
  Published_news?: number;
  Total_landingpage?: number;
  Published_landingpage?: number;
  Users?: number;
  totalJobsEnquires?: number;
}


// CardItem component for reusable card elements
const CardItem = ({ href, title, value, icon }: { href: string; title: string; value: ReactNode, icon?: any }) => (
  <Grid item xs={12} sm={4} md={2} >
    <Card>

      <Link href={href}>
        {/* <CardHeader /> */}
        <div className='d-flex justify-content-evenly align-content-center  g-3 pt-2'>
          <h3 style={{ color: 'black' }}>{icon}</h3>
          <div className='d-flex justify-content-center align-content-center'><p className='pt-2 '>{title}</p></div>
        </div>
        {/* <CardHeader/> */}
        <CardContent className=' p-2 pt-1 d-flex justify-content-center'>
          <Typography variant="body1" color="textSecondary">
            {value}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  </Grid>
);

const Home = () => {
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<PageData | null>(null);
  const [enquirydata, setEnquirydata] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/dashboard/get');
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch page data:', error);
      setLoading(false); // Update loading state in case of an error
    }
  }, [isMountedRef]);


  const getEnquirydata = useCallback(async () => {
    try {
      const response = await axios.get('api/admin/findenquiry/get');
      if (isMountedRef.current) {
        const { totalDataCount } = response.data;
        // Set the totalDataCount to your state
        setEnquirydata(totalDataCount);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch enquiry data:', error);
      setLoading(false); // Update loading state in case of an error
    }
  }, [isMountedRef]);


  useEffect(() => {
    getPagedata();
    getEnquirydata();
  }, [getPagedata]);

  if (loading) {
    return <Spinner />;
  }

  if (!pagedata) {
    return <Typography variant="body1" color="textSecondary">Failed to load data</Typography>;
  }


  return (
    <>

      {/* <Card>
      <CardHeader title="Welcome Learntech Admin!"/> */}
      <Grid container spacing={3}>
        <CardItem
          icon={<BsFileBarGraphFill />}

          href="/app/dashboard/enquiry/" // Adjust the href as needed
          title="Today Enquiry" // Adjust the title if necessary
          value={`${enquirydata}/${enquirydata}`} // Display the totalDataCount twice
        />

        <CardItem
          icon={<BsBuilding />}
          href="/app/dashboard/college/"
          title="Colleges"
          value={`${pagedata.Published_colleges}/${pagedata.Total_colleges}`}
        />
        <CardItem
          icon={<BsBank />}

          href="/app/dashboard/college/"
          title="Universities"
          value={`${pagedata.Published_universities}/${pagedata.Total_universitys}`}
        />
        <CardItem
          icon={<BsBank2 />}

          href="/app/dashboard/schools/"
          title="Schools"
          value={`${pagedata.Published_school}/${pagedata.school}`}
        />
        <CardItem
          icon={<BsCardHeading />}

          href="/app/dashboard/stream/"
          title="Streams"
          value={pagedata.stream}
        />
        <CardItem
          icon={<BsBorderWidth />}
          href="/app/dashboard/generalcourse/"
          title="General Courses"
          value={pagedata.generalcourse}
        />
        <CardItem

          icon={<BsBookHalf />}

          href="/app/dashboard/course/"
          title="College Courses"
          value={`${pagedata.Published_courses}/${pagedata.courses}`}
        />
        <CardItem
          icon={<BsAirplaneEnginesFill />}

          href="/app/dashboard/abroadpage/"
          title="Abroad Pages"
          value={pagedata.abroadpages}
        />
        <CardItem
          icon={<BsFillPassFill />}
          href="/app/dashboard/exam/"
          title="Exams"
          value={`${pagedata.Published_exam}/${pagedata.exam}`}
        />
        <CardItem
          icon={<BsFileBarGraphFill />}

          href="/app/dashboard/enquiry/"
          title="Enquires"
          value={pagedata.enquiry}
        />
        <CardItem
          icon={<BsBlockquoteLeft />}
          href="/app/dashboard/blog/"
          title="Blogs"
          value={`${pagedata.Published_blog}/${pagedata.blog}`}
        />
        <CardItem
          icon={<BsBank2 />}

          href="/app/dashboard/schoolboard/"
          title="Boards"
          value={pagedata.schoolboards}
        />
        <CardItem
          icon={<BsFillJournalBookmarkFill />}

          href="/app/dashboard/scholarship/"
          title="Scholarships"
          value={`${pagedata.Published_scholarships}/${pagedata.scholarships}`}
        />
        <CardItem
          icon={<BsFillPersonLinesFill />}
          href="/app/dashboard/jobs_positions/"
          title="Jobs Positions"
          value={pagedata.jobs_positions}
        />
        <CardItem
          icon={<BsFillPersonLinesFill />}
          href="/app/dashboard/jobenquiry/"
          title="Jobs Enquires"
          value={pagedata?.totalJobsEnquires}
        />
        <CardItem
          icon={<BsFillPipFill />}
          href="/app/dashboard/newsevents/"
          title="News"
          value={`${pagedata.Published_news}/${pagedata.Total_news}`}
        />
        <CardItem
          icon={<BsFillPostageFill />}
          href="/app/dashboard/landingpage/"
          title="Landing Pages"
          value={`${pagedata.Published_landingpage}/${pagedata.Total_landingpage}`}
        />
        <CardItem
          icon={<BsFillPersonLinesFill />}
          href="/app/dashboard/user/"
          title="Users"
          value={`${pagedata.Users}`}
        />
      </Grid>
      {/* </Card> */}
    </>
  );
}

export default Home;
