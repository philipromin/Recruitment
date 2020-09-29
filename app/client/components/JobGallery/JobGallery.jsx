import JobCard from '../JobCard';

const JobGallery = ({ jobs, currentUser }) => {
  return (
    <div className="px-20 py-4">
      {jobs.length !== 0 ? (
        jobs.map((job) => (
          <JobCard job={job} key={job.id} currentUser={currentUser} />
        ))
      ) : (
        <p className="text-center">Found no jobs</p>
      )}
    </div>
  );
};

export default JobGallery;
