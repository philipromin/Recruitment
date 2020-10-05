import Router from 'next/router';
import axios from 'axios';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const CreateJobPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    errors,
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'requirements',
  });
  const onSubmit = async ({ title, description, requirements }) => {
    //React hook form doesn't support flat arrays so we have to do it like this
    if (requirements) {
      requirements = requirements.reduce(
        (arr, elem) => arr.concat(elem.requirement),
        [],
      );
    }

    try {
      const response = await axios.post('/api/jobs/create', {
        title,
        description,
        requirements,
      });
      Router.push('/jobs');
    } catch (error) {
      setError('manual', {
        message: 'Job creation failed',
      });
      console.error(error);
    }
  };
  console.log(errors);
  return (
    <form
      className="flex flex-col gap-3 px-20 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.manual && <p className="text-red-600">{errors.manual.message}</p>}

      <input
        className="p-2"
        name="title"
        placeholder="Title"
        ref={register({ required: 'Please enter a job title' })}
      />
      {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      <input
        className="p-2"
        name="description"
        placeholder="Description"
        ref={register({ required: 'Please enter a job description' })}
      />
      {errors.description && (
        <p className="text-red-600">{errors.description.message}</p>
      )}
      {fields.map((item, index) => (
        <li className="list-none" key={item.id}>
          <Controller
            as={<input className="p-2" />}
            name={`requirements[${index}].requirement`}
            control={control}
            defaultValue=""
            placeholder="Requirement"
            rules={{ required: 'Please enter a requirement' }}
          />
          <button
            className="p-1 ml-4 text-white bg-red-600 rounded-sm"
            type="button"
            onClick={() => remove(index)}
          >
            Remove
          </button>
        </li>
      ))}
      {errors.requirements && (
        <p className="text-red-600">Please remove unused requirement field</p>
      )}
      <button
        className="inline-block p-1 font-semibold text-left outline-none focus:outline-none"
        type="button"
        onClick={() => append()}
      >
        Add requirement
      </button>
      <button
        className="p-2 text-white rounded-sm bg-recruitment-blue"
        onClick={() => clearErrors('manual')}
        type="submit"
      >
        Create Job
      </button>
    </form>
  );
};

export default CreateJobPage;
