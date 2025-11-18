// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/app/dashboard',
      icon: 'tabler:smart-home',
      action: 'manage',
      subject: 'dashboard',
      auth: false
    },
    {
      sectionTitle: 'Main',
      auth: false
    },

    {
      title: 'University/Colleges',
      icon: 'tabler:school',
      auth: false,
      children: [
        {
          title: 'College',
          path: '/app/dashboard/college',
          // icon: 'tabler:mail',
          auth: false
        },
        {
          title: 'College Courses',
          path: '/app/dashboard/course',
          icon: 'tabler:notes',
          auth: false
        }
      ]
    },

    {
      title: 'School',
      icon: 'tabler:building',
      auth: false,
      children: [
        {
          title: 'School Board',
          path: '/app/dashboard/schoolboard',
          auth: false
        },
        {
          title: 'Schools',
          path: '/app/dashboard/schools',
          // icon: 'tabler:mail',
          auth: false
        }
      ]
    },
    {
      title: 'Exam',
      path: '/app/dashboard/exam',
      icon: 'tabler:file-pencil',
      auth: false
    },
    {
      title: 'News',
      icon: 'tabler:news',
      auth: false,
      children: [
        {
          title: 'News Categories',
          path: '/app/dashboard/newscategories',
          auth: false
        },
        {
          title: 'News & Events',
          path: '/app/dashboard/newsevents',
          auth: false
        }
      ]
    },
    {
      title: 'Blogs',
      icon: 'tabler:news',
      auth: false,
      children: [
        {
          title: 'Blogs Categories',
          path: '/app/dashboard/blogscategories',
          auth: false
        },
        {
          title: 'Blog',
          path: '/app/dashboard/blog',
          auth: false
        },
        {
          title: 'Blog Comments',
          path: '/app/dashboard/blogcomments',
          auth: false
        }
      ]
    },


    {
      title: 'User',
      path: '/app/dashboard/user',
      icon: 'tabler:users',
      auth: false
    },

    {
      title: 'Review',
      path: '/app/dashboard/review',
      icon: 'tabler:address-book',
      auth: false
    },

    {
      title: 'Enquiries',
      path: '/app/dashboard/enquiry',
      icon: 'tabler:phone-outgoing',
      auth: false
    },

    {
      sectionTitle: 'Starter',
      auth: false
    },
    {
      title: 'Setup Single Pages',
      path: '/app/dashboard/Pagess',
      icon: 'tabler:book',
      auth: false
    },
    {
      title: 'Locations',
      icon: 'tabler:map-pin',
      auth: false,
      children: [
        {
          title: 'Countries',
          path: '/app/dashboard/locations/countries',
          auth: false
        },
        {
          title: 'States',
          path: '/app/dashboard/locations/states',
          auth: false
        },
        {
          title: 'Cities',
          path: '/app/dashboard/locations/cities',
          auth: false
        }
      ]
    },

    {
      title: 'Stream',
      path: '/app/dashboard/stream',
      icon: 'tabler:baseline-density-small',
      auth: false
    },
    {
      title: 'Substream',
      path: '/app/dashboard/substream',
      icon: 'tabler:clipboard-text',
      auth: false
    },
    {
      title: 'General Course',
      path: '/app/dashboard/generalcourse',
      icon: 'tabler:book-filled',
      auth: false
    },

    {
      title: 'Amenities',
      path: '/app/dashboard/amenities',
      icon: 'tabler:user',
      auth: false
    },

    {
      title: 'Recognition',
      path: '/app/dashboard/recognition',
      icon: 'tabler:text-recognition',
      auth: false
    },

    {
      title: 'Banner',
      path: '/app/dashboard/banner',
      icon: 'tabler:frame',
      auth: false
    },

    {
      title: 'Abroad Page',
      path: '/app/dashboard/abroadpage',
      icon: 'tabler:notebook',
      auth: false
    },

    {
      title: 'Scholarship',
      icon: 'tabler:layout-sidebar-left-collapse',
      auth: false,
      children: [
        {
          title: 'Scholar Type',
          path: '/app/dashboard/scholar_type ',
          // icon: 'tabler:layout-sidebar-left-collapse',
          auth: false
        },

        {
          title: 'Scholar Level',
          path: '/app/dashboard/scholar_level ',
          // icon: 'tabler:notes',
          auth: false
        },
        {
          title: 'Scholarship',
          path: '/app/dashboard/scholarship ',
          // icon: 'tabler:notes',
          auth: false
        }
      ]
    },

    {
      title: 'Landing Page',
      path: '/app/dashboard/landingpage ',
      icon: 'tabler:note',
      auth: false
    },

    {
      title: 'Testimonial',
      path: '/app/dashboard/testimonial',
      icon: 'tabler:device-tv',
      auth: false
    },

    {
      title: 'Team',
      path: '/app/dashboard/ourteam',
      icon: 'tabler:users',
      auth: false
    },
    {
      title: 'Organization Pages',
      path: '/app/dashboard/organization-pages',
      icon: 'tabler:affiliate',
      auth: false
    },
    {
      title: 'Redirections',
      path: '/app/dashboard/redirection',
      icon: 'tabler:book',
      auth: false
    },
    {
      title: 'Counsellor Team',
      path: '/app/dashboard/counsellor-team',
      icon: 'tabler:users',
      auth: false
    },

    {
      title: 'Job',
      icon: 'tabler:weight',
      auth: false,
      children: [
        {
          title: 'All Job Location',
          path: '/app/dashboard/job_locations ',
          // icon: 'tabler:layout-sidebar-left-collapse',
          auth: false
        },

        {
          title: 'Jobs Positions',
          path: '/app/dashboard/jobs_positions ',
          // icon: 'tabler:notes',
          auth: false
        },



        {
          title: 'Job Enquiry',
          path: '/app/dashboard/jobenquiry',
          // icon: 'tabler:notes',
          auth: false
        }
      ]
    },

    {
      title: 'Data Backup',
      path: '/app/dashboard/databackup',
      icon: 'tabler:cloud-download',
      auth: false
    },

    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
