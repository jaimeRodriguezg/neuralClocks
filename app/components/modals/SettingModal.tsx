'use client';
import { FC, useContext, useState } from 'react';
import useSettingModal from '@/app/hooks/useSettingsModal';
import { ErouteNames, ISettingsInput } from '@/app/types/';
import { useForm } from 'react-hook-form';
import Heading from '../ui/heading/Heading';
import Input from '../ui/inputs/Input';
import Modal from './Modal';
import { TimerContext } from '@/app/context';
import { usePathname, useRouter } from 'next/navigation';

const SettingModal: FC = () => {
  const settingModal = useSettingModal();
  const router = useRouter();
  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const {
    pomodoro,
    shortBreak,
    longBreak,
    interval,
    setPomodoro,
    setShortBreak,
    setLongBreak,
    setInterval,
    setCounter,
  } = useContext(TimerContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISettingsInput>({
    mode: 'onChange',
    defaultValues: {
      pomodoroTimer: pomodoro,
      shortTimer: shortBreak,
      longTimer: longBreak,
      interval: interval,
    },
  });

  const onSubmit = (formData: ISettingsInput) => {
    //si el formulario no es válido, no ejecuta el resto de la funcion
    if (!isValid) return;

    setPomodoro(formData.pomodoroTimer);
    setShortBreak(formData.shortTimer);
    setLongBreak(formData.longTimer);
    setInterval(formData.interval);
    setCounter(0);
    settingModal.onClose();
    router.push(ErouteNames.DEFAULT);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Configuración NeuralClocks"
        subtitle="Configura tus temporizadores en minutos"
      />
      <div className="flex gap-4">
        <Input
          field={register('pomodoroTimer', { min: 0 })}
          id="pomodoroTimer"
          label="Pomodoro"
          disabled={isLoading}
          errors={errors}
          min={0}
          type="number"
          required
        />
        <Input
          field={register('shortTimer', { min: 0 })}
          id="shortTimer"
          label="shortTimer"
          disabled={isLoading}
          errors={errors}
          min={0}
          type="number"
          required
        />
        <Input
          field={register('longTimer', { min: 0 })}
          id="longTimer"
          label="longTimer"
          disabled={isLoading}
          errors={errors}
          min={0}
          type="number"
          required
        />
      </div>

      <div className="font-light text-neutral-500 mt-2">
        Configura cantidad de intervalos
      </div>
      <Input
        field={register('interval', { min: 0 })}
        id="interval"
        label="interval"
        disabled={isLoading}
        errors={errors}
        min={0}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={settingModal.isOpen}
      title="Configuración General"
      actionLabel="Guardar"
      onClose={settingModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default SettingModal;
