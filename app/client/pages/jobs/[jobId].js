import Router from 'next/router';
import axios from 'axios';

const JobPage = ({ job, currentUser }) => {
  const apply = async (jobId) => {
    try {
      const response = await axios.post('/api/applications', {
        jobId,
      });
      Router.push('/applications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 mx-20 my-4 bg-white shadow-md rounded-m">
      <div className="flex flex-row justify-between">
        <div />
        <h1 className="text-xl font-medium text-center text-recruitment-yellow">
          {job.title}
        </h1>
        <button
          onClick={() => apply(job.id)}
          disabled={!currentUser}
          className="font-semibold text-recruitment-blue"
        >
          Apply
        </button>
      </div>

      <p className="mb-10 font-light">{job.description}</p>
      <h2 className="underline">Requirements:</h2>
      <ul className="">
        {job.requirements.map((requirement) => (
          <li className="" key={requirement}>
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
};

JobPage.getInitialProps = async (context, client) => {
  const { jobId } = context.query;

  const { data } = await client.get(`/api/jobs/${jobId}`);

  return { job: data };
};

export default JobPage;
