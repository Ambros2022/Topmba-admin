// ** MUI Imports
import { ReactNode, useCallback, useEffect, useState } from 'react';
import Spinner from 'src/@core/components/spinner';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/adminaxios';
import Link from 'next/link';
import { 
  BsFileBarGraphFill, 
  BsCardHeading, 
  BsBuilding, 
  BsBank, 
  BsBookHalf, 
  BsFillPassFill, 
  BsBlockquoteLeft, 
  BsFillPersonLinesFill, 
  BsFillPostageFill, 
  BsFillPipFill 
} from "react-icons/bs";

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

// Color configurations mapped to UI themes
interface ColorConfig {
  bgColor: string;
  iconColor: string;
  progressColor: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  hexColor: string;
}

const getColorConfig = (title: string): ColorConfig => {
  const t = title.toLowerCase();
  
  // Leads & Enquiries
  if (t.includes('today') || t.includes('enquiry') || t.includes('enquires')) {
    return {
      bgColor: 'rgba(255, 152, 0, 0.08)',
      iconColor: '#f57c00',
      progressColor: 'warning',
      hexColor: '#ff9800',
    };
  }
  
  // Colleges & Universities
  if (t.includes('college') || t.includes('universit')) {
    return {
      bgColor: 'rgba(33, 150, 243, 0.08)',
      iconColor: '#1976d2',
      progressColor: 'primary',
      hexColor: '#2196f3',
    };
  }
  
  // Content & Pages (Articles, News, Landing Pages)
  if (t.includes('article') || t.includes('blog') || t.includes('news') || t.includes('landing') || t.includes('page')) {
    return {
      bgColor: 'rgba(244, 67, 54, 0.08)',
      iconColor: '#d32f2f',
      progressColor: 'error',
      hexColor: '#f44336',
    };
  }
  
  // Courses, Exams & Specialisations
  if (t.includes('specialisation') || t.includes('course') || t.includes('exam')) {
    return {
      bgColor: 'rgba(76, 175, 80, 0.08)',
      iconColor: '#388e3c',
      progressColor: 'success',
      hexColor: '#4caf50',
    };
  }
  
  // Users & Jobs Positions
  return {
    bgColor: 'rgba(156, 39, 176, 0.08)',
    iconColor: '#7b1fa2',
    progressColor: 'secondary',
    hexColor: '#9c27b0',
  };
};

// Parse metrics value containing ratio / fraction
const parseMetric = (value: ReactNode) => {
  if (typeof value === 'string' && value.includes('/')) {
    const parts = value.split('/');
    const numerator = parseInt(parts[0], 10);
    const denominator = parseInt(parts[1], 10);
    if (!isNaN(numerator) && !isNaN(denominator)) {
      const percentage = denominator > 0 ? Math.min(100, Math.round((numerator / denominator) * 100)) : 0;
      return {
        isRatio: true,
        numerator,
        denominator,
        percentage,
        displayValue: `${numerator.toLocaleString()} / ${denominator.toLocaleString()}`,
        subtitle: `Published: ${percentage}%`
      };
    }
  }
  
  // Standard number or custom ReactNode
  return {
    isRatio: false,
    numerator: 0,
    denominator: 0,
    percentage: 0,
    displayValue: typeof value === 'number' ? value.toLocaleString() : String(value || '0'),
    subtitle: null
  };
};

// CardItem component for reusable card elements
const CardItem = ({ href, title, value, icon }: { href: string; title: string; value: ReactNode; icon?: any }) => {
  const colors = getColorConfig(title);
  const metric = parseMetric(value);

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card
        sx={{
          height: '100%',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 1.5,
          border: theme => `1px solid ${theme.palette.divider}`,
          boxShadow: theme => theme.palette.mode === 'light' 
            ? '0 1px 3px rgba(93, 89, 108, 0.02), 0 2px 6px rgba(93, 89, 108, 0.04)'
            : '0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: theme => theme.palette.mode === 'light'
              ? '0 4px 12px rgba(93, 89, 108, 0.1)'
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
            borderColor: colors.hexColor,
          }
        }}
      >
        <Link href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
          <CardContent sx={{ p: '12px !important', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  mr: 2,
                  backgroundColor: colors.bgColor,
                  color: colors.iconColor,
                  borderRadius: '8px',
                  '& svg': { fontSize: '1.1rem' }
                }}
              >
                {icon}
              </Avatar>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.secondary',
                  letterSpacing: '0.1px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem'
                }}
              >
                {title}
              </Typography>
            </Box>

            <Box sx={{ mt: 'auto' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary', fontSize: '1.15rem' }}>
                {metric.displayValue}
              </Typography>

              {metric.isRatio ? (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.65rem' }}>
                      Published
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.iconColor, fontWeight: 600, fontSize: '0.65rem' }}>
                      {metric.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={metric.percentage}
                    color={colors.progressColor}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: theme => theme.palette.mode === 'light' ? '#f0f0f0' : '#3a3a3a',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>
              ) : (
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.5, fontSize: '0.65rem' }}>
                  Total Records
                </Typography>
              )}
            </Box>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

// Custom Section Header Component
const SectionHeader = ({ title }: { title: string }) => (
  <Grid item xs={12} sx={{ mt: 2, mb: 0.5 }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mr: 2, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: 'divider' }} />
    </Box>
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
      setLoading(false);
    }
  }, [isMountedRef]);

  const getEnquirydata = useCallback(async () => {
    try {
      const response = await axios.get('api/admin/findenquiry/get');
      if (isMountedRef.current) {
        const { totalDataCount } = response.data;
        setEnquirydata(totalDataCount);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch enquiry data:', error);
      setLoading(false);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPagedata();
    getEnquirydata();
  }, [getPagedata, getEnquirydata]);

  if (loading) {
    return <Spinner />;
  }

  if (!pagedata) {
    return (
      <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" color="textSecondary">Failed to load data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={4}>
        {/* Welcome Header Banner */}
        <Grid item xs={12}>
          <Card
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2,
              border: theme => `1px solid ${theme.palette.divider}`,
              background: theme => theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #7367F0 0%, #9E95F5 100%)'
                : 'linear-gradient(135deg, #283048 0%, #859398 100%)',
              color: 'white',
              boxShadow: '0 2px 10px 0 rgba(0,0,0,0.05)'
            }}
          >
            <CardContent sx={{ p: '20px !important' }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={9}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'white' }}>
                    Welcome Back, Admin! 👋
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.85, color: 'white', fontSize: '0.85rem' }}>
                    Here is the latest snapshot of your TopMBA platform. Monitor listings, manage enquires, and view site metrics below.
                  </Typography>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 2.5, py: 0.5, borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'white', fontSize: '0.75rem' }}>
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Box sx={{ fontSize: '3rem', opacity: 0.9 }}>
                    🎓
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Section 1: Inquiries & Leads */}
        <SectionHeader title="Leads & Enquiries" />
        <CardItem
          icon={<BsFileBarGraphFill />}
          href="/app/dashboard/enquiry/"
          title="Today Enquiry"
          value={`${enquirydata}/${enquirydata}`}
        />
        <CardItem
          icon={<BsFileBarGraphFill />}
          href="/app/dashboard/enquiry/"
          title="Enquires"
          value={pagedata.enquiry}
        />
        <CardItem
          icon={<BsFillPersonLinesFill />}
          href="/app/dashboard/jobenquiry/"
          title="Jobs Enquires"
          value={pagedata?.totalJobsEnquires}
        />

        {/* Section 2: Academic Directory */}
        <SectionHeader title="Academic Directory" />
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
          icon={<BsCardHeading />}
          href="/app/dashboard/stream/"
          title="Specialisation"
          value={pagedata.stream}
        />
        <CardItem
          icon={<BsBookHalf />}
          href="/app/dashboard/course/"
          title="College Courses"
          value={`${pagedata.Published_courses}/${pagedata.courses}`}
        />
        <CardItem
          icon={<BsFillPassFill />}
          href="/app/dashboard/exam/"
          title="Exams"
          value={`${pagedata.Published_exam}/${pagedata.exam}`}
        />

        {/* Section 3: Content & Portal */}
        <SectionHeader title="Portal Content & Operations" />
        <CardItem
          icon={<BsBlockquoteLeft />}
          href="/app/dashboard/blog/"
          title="Articles"
          value={`${pagedata.Published_blog}/${pagedata.blog}`}
        />
        <CardItem
          icon={<BsFillPersonLinesFill />}
          href="/app/dashboard/jobs_positions/"
          title="Jobs Positions"
          value={pagedata.jobs_positions}
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
    </Box>
  );
};

export default Home;
