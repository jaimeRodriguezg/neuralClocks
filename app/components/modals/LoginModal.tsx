'use client';
import { useCallback, useState, FC } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import {
  AuthenticationDetails,
  CognitoUser,
  userPool,
} from '@/app/utils/cognito';
import Heading from '../ui/heading/Heading';
import Input from '../ui/inputs/Input';
import { ILoginInput } from '@/app/types/setting';

const LoginModal: FC = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const authenticationDetails = new AuthenticationDetails({
      Username: data.email,
      Password: data.password,
    });

    const cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('Inicio de sesión exitoso:', result);
      },
      onFailure: (err) => {
        console.error('Error en el inicio de sesión:', err);
      },
    });
    setIsLoading(false);
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bienvenido a NeuralClocks"
        subtitle="Ingresa con tu cuenta!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        field={register('email', { required: true })}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        errors={errors}
        field={register('password', { required: true })}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          ¿No tienes cuenta?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            Create una cuenta
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Ingresar"
      actionLabel="Continuar"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
