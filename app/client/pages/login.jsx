import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form
      className="flex flex-col w-2/3 gap-2 mx-auto my-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="my-4 text-xl font-semibold text-center text-recruitment-black">
        Welcome to Rekryt
      </p>
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
        className="p-4 font-semibold text-white rounded-lg bg-recruitment-yellow"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginPage;
