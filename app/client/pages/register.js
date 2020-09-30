import Router from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setError,
    clearErrors,
  } = useForm();
  const onSubmit = async ({ email, password, role }) => {
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
        role,
      });
      Router.push('/jobs');
    } catch (error) {
      setError('manual', {
        type: 'manual',
        message: 'Registration failed',
      });
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col w-2/3 gap-2 mx-auto my-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="my-4 text-xl font-semibold text-center text-recruitment-black">
        Welcome to Rekryt
      </p>
      {errors.manual && <p className="text-red-600">{errors.manual.message}</p>}
      <input
        className="p-4 rounded-sm"
        name="email"
        type="email"
        placeholder="Email"
        ref={register({ required: 'Please enter your email' })}
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      <select className="p-2" name="role" ref={register}>
        <option value="applicant">Applicant</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <input
        className="p-4 rounded-sm"
        name="password"
        type="password"
        placeholder="Password"
        ref={register({ required: 'Please enter your password' })}
      />
      {errors.password && (
        <p className="text-red-600">{errors.password.message}</p>
      )}
      <input
        className="p-4 rounded-sm"
        name="repeat_password"
        type="password"
        placeholder="Repeat Password"
        ref={register({
          validate: (value) =>
            value === watch('password') || "Passwords don't match.",
        })}
      />
      {errors.repeat_password && (
        <p className="text-red-600">{errors.repeat_password.message}</p>
      )}
      <button
        type="submit"
        onClick={() => clearErrors('manual')}
        className="p-4 font-semibold text-white rounded-lg bg-recruitment-yellow"
      >
        Sign up
      </button>
    </form>
  );
};

export default RegisterPage;
