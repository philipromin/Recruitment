import Router from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  console.log(errors);
  const onSubmit = async ({ email, password }) => {
    try {
      const response = await axios.post('/api/users/signin', {
        email,
        password,
      });
      Router.push('/jobs');
    } catch (error) {
      setError('manual', {
        message: 'Login failed',
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
        className="p-4 rounded-lg"
        name="email"
        type="email"
        placeholder="Email"
        ref={register({ required: 'Please enter your email' })}
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      <input
        className="p-4 rounded-lg"
        name="password"
        type="password"
        placeholder="Password"
        ref={register({ required: 'Please enter your password' })}
      />
      {errors.password && (
        <p className="text-red-600">{errors.password.message}</p>
      )}
      <button
        type="submit"
        onClick={() => clearErrors('manual')}
        className="p-4 font-semibold text-white rounded-lg bg-recruitment-yellow"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginPage;
