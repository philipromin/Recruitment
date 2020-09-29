import Link from 'next/link';

const JobCard = ({ job, currentUser }) => {
  return (
    <div className="flex flex-row justify-between p-4 my-2 bg-white rounded-md shadow-md">
      <a className="text-recruitment-black">{job.title}</a>
      <Link href="/jobs/[jobId]" as={`/jobs/${job.id}`}>
        <a className="font-semibold text-recruitment-blue">View</a>
      </Link>
    </div>
  );
};

export default JobCard;
