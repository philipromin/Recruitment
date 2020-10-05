import Link from 'next/link';

const ApplicationsPage = ({ currentUser, applications }) => {
  console.log(applications);
  return (
    <div className="flex flex-col gap-1 px-20 py-4">
      {applications.map((application) => (
        <div className="flex flex-row justify-between p-4 my-2 bg-white rounded-md shadow-md">
          <p className="text-recruitment-black">{application.job.title}</p>
          <p className="text-recruitment-black">{application.status}</p>
          <Link href="/jobs/[jobId]" as={`/jobs/${application.job._id}`}>
            <a className="font-semibold text-recruitment-blue">View</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

ApplicationsPage.getInitialProps = async (context, client, currentUser) => {
  if (!currentUser) return {};
  const { data } = await client.get(`/api/applications`);

  return { applications: data };
};

export default ApplicationsPage;
