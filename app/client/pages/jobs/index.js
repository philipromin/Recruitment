import { JobGallery, RecruiterDashboard } from 'components';

const JobsPage = ({ currentUser, jobs }) => {
  return <JobGallery jobs={jobs} currentUser={currentUser} />;
};

JobsPage.getInitialProps = async (context, client) => {
  const { data } = await client.get(`/api/jobs`);

  return { jobs: data };
};

export default JobsPage;
