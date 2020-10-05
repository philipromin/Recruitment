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
    getValues,
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'requirements',
    },
  );
  const onSubmit = async ({ title, description, requirements }) => {
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
  return (
    <form
      className="flex flex-col gap-3 px-20 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.manual && <p className="text-red-600">{errors.manual.message}</p>}

      <input className="p-2" name="title" placeholder="Title" ref={register} />
      <input
        className="p-2"
        name="description"
        placeholder="Description"
        ref={register}
      />
      {fields.map((item, index) => (
        <li className="list-none" key={item.id}>
          <Controller
            as={<input className="p-2" />}
            name={`requirements[${index}].requirement`}
            control={control}
            defaultValue=""
            placeholder="Requirement"
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
      <button
        className="inline-block p-1 text-left outline-none focus:outline-none"
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
