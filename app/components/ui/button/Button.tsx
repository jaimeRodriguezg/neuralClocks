'use client';
import { FC, MouseEvent } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  width?: string;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  width,
}) => {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-${
        width ? width : 'full'
      } 
      ${outline ? 'bg-white' : 'bg-green-400'} 
      ${outline ? 'border-white' : 'border-green-400'} 
      ${outline ? 'text-black' : 'text-white'} 
      ${small ? 'py-1' : 'py-3'} 
      ${small ? 'text-sm' : 'text-md'} 
      ${small ? 'font-normal' : 'font-semibold'} 
      ${small ? 'border-[1px]' : 'border-2'} 
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={24} className="absolute left-4" />}

      {label}
    </button>
  );
};

export default Button;
