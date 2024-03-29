import DiscountButton from "../../UI/DiscountButton/DiscountButton";
import Input from "../../UI/Input/Input";
import { fetchPostSale } from "../../asyncActions/postOrder";
import s from "./DiscountForm.module.css";
import { useForm } from "react-hook-form";


export default function DiscountForm() {
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let onSubmit = (data) => {
    console.log(data);
    fetchPostSale(data)
    reset();
  };


  return (
    <form className={s.form_container} onSubmit={handleSubmit(onSubmit)}>
      <Input
      style={{backgroundColor: 'transparent'}}
        placeholder="Name"
        type="text"
        id="name"
        {...register("name", { required: "required field" })}
      />
      {errors.name && (
        <span className={s.error_text}>{errors.name.message}</span>
      )}

      <Input
        style={{backgroundColor: 'transparent'}}
        placeholder="Phone"
        type="tel"
        id="phone"
        {...register("phone", {
          required: "required field",
          maxLength: {
            value: 14,
            message: "Phone number should contain 14 symbols",
          },
        })}
      />
      {errors.phone && (
        <span className={s.error_text}>{errors.phone.message}</span>
      )}

      <Input
        style={{backgroundColor: 'transparent'}}
        placeholder="Email"
        type="email"
        id="email"
        {...register("email", {
          required: "required field",
          pattern: {
            message: "Wrong email",
            value:
              /^([A-z])+([0-9-_.])*([A-z0-9-_.])*@([A-z])+([0-9-_.])*([A-z0-9-_.])*[.]([A-z]){2,6}$/,
          },
        })}
      />
      {errors.email && (
        <span className={s.error_text}>{errors.email.message}</span>
      )}

      <DiscountButton
        type={"submit"}
      />
    </form>
  );
}
