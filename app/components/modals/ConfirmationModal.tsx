'use client';

import { useState, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import useConfirmationModal from '@/app/hooks/useConfirmationModal';
import { CognitoUser, userPool } from '@/app/utils/cognito';
import Heading from '../ui/heading/Heading';
import Input from '../ui/inputs/Input';
import { IConfirmationInput } from '@/app/types/setting';

const ConfirmationModal: FC = () => {
  const confirmationModal = useConfirmationModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IConfirmationInput>({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit: SubmitHandler<IConfirmationInput> = (data) => {
    setIsLoading(true);

    const userData = {
      Username: confirmationModal.email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(data.code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
    });

    setIsLoading(false);
  };

  const resendCode = () => {
    setIsLoading(true);
    const userData = {
      Username: confirmationModal.email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      confirmationModal.onClose();
    });

    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Confimación"
        subtitle="Confirma tu cuenta con el código enviado a tu correo electrónico"
      />
      <Input
        id="code"
        label="Codigo de verificación"
        disabled={isLoading}
        field={register('code', { required: true })}
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
          ¿No te ha llegado un código?
          <span
            onClick={resendCode}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Reenviar código
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={confirmationModal.isOpen}
      title="Ingresar"
      actionLabel="Continuar"
      onClose={confirmationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ConfirmationModal;
