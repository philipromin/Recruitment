import Link from 'next/link';
import JobCard from '../JobCard';

const JobGallery = ({ jobs, currentUser }) => {
  return (
    <div className="flex flex-col px-20 py-4 text-center">
      {currentUser?.role === 'recruiter' && (
        <Link href="/jobs/create">
          <a className="p-2 rounded-sm bg-recruitment-yellow text-recruitment-light-gray">
            Create a job
          </a>
        </Link>
      )}
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default JobGallery;
