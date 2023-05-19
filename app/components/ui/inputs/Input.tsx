"use client";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

// se crea una interfaz generica para que cada input tenga tipado de cada formulario
interface InputProps<T extends FieldValues> {
  id: keyof T;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  min?: number;
  field: UseFormRegisterReturn;
  errors: FieldErrors;
  defaultValue?: string | number | readonly string[] | undefined;
  placholder?: string;
}

// dejamos el componente generico, donde se
// espera que T extienda un valor de FieldValues [x: string]: any;
// notar que field retornara todas las funciones base de react hook form como
// onChange, onBlur, name, etc
const Input = <T extends FieldValues>({
  id,
  label,
  type,
  disabled,
  formatPrice,
  errors,
  field,
  defaultValue,
  placholder,
}: InputProps<T>): JSX.Element => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
                text-neutral-700
                absolute
                top-5
                left-2
              "
        />
      )}
      <input
        {...field}
        id={id as string}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placholder}
        type={type}
        className={`
              peer
              w-full
              p-4
              pt-6 
              font-light 
              bg-white 
              border-2
              rounded-md
              outline-none
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
              ${formatPrice ? "pl-9" : "pl-4"}
              ${errors[id as string] ? "border-rose-500" : "border-neutral-300"}
              ${
                errors[id as string]
                  ? "focus:border-rose-500"
                  : "focus:border-black"
              }
            `}
      />
      <label
        className={`
              absolute 
              text-md
              duration-150 
              transform 
              -translate-y-3 
              top-5 
              z-10 
              origin-[0] 
              ${formatPrice ? "left-9" : "left-4"}
              peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75
              peer-focus:-translate-y-4
              ${errors[id as string] ? "text-rose-500" : "text-zinc-400"}
            `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
