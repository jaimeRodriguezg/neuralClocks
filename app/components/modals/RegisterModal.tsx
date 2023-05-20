'use client';
import { FC, useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';

import { CognitoUserAttribute, userPool } from '@/app/utils/cognito';
import useLoginModal from '@/app/hooks/useLoginModal';
import useConfirmationModal from '@/app/hooks/useConfirmationModal';
import { IRegisterInput } from '@/app/types/setting';
import Heading from '../ui/heading/Heading';
import Input from '../ui/inputs/Input';

const RegisterModal: FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const confirmationModal = useConfirmationModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    if (data.password !== data.confirmPassword) return;

    console.log(data);
    setIsLoading(true);

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: data.email,
      }),
    ];

    userPool.signUp(
      data.email,
      data.password,
      attributeList,
      attributeList,
      (err, result) => {
        if (err) {
          console.log('Error en el registro', err);
          setIsLoading(false);
          return;
        }
        console.log('Registro existoso', result);
        setIsLoading(false);
        registerModal.onClose();
        confirmationModal.setEmail(data.email);
        confirmationModal.onOpen();
      },
    );
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bienvenido a NeuralClocks" subtitle="Crear una cuenta" />
      <Input
        field={register('email', { required: true })}
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        field={register('password', { required: true })}
        id="password"
        type="password"
        label="password"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        field={register('confirmPassword', { required: true })}
        id="confirmPassword"
        type="password"
        label="Repeat password"
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          ¿Ya tienes una cuenta?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            Ingresar
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registrarse"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
