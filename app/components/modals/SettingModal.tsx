'use client';
import { FC, useContext, useEffect, useState } from 'react';
import useSettingModal from '@/app/hooks/useSettingsModal';
import { ErouteNames, ISettingsInput } from '@/app/types/';
import { useForm } from 'react-hook-form';
import Heading from '../ui/heading/Heading';
import Input from '../ui/inputs/Input';
import Modal from './Modal';
import { TimerContext } from '@/app/context/timer';
import { useRouter } from 'next/navigation';
import { useCreateSettingPomodoroInputMutation } from '@/graphql/generated/schema';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '@/app/context/user';

const SettingModal: FC = () => {
  const settingModal = useSettingModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { sub, email } = useContext(UserContext);

  const [createSettingPomodoroMutation] = useCreateSettingPomodoroInputMutation(
    {
      onCompleted: () => {
        toast('Temporizadores creados!');
        setIsLoading(false);
      },

      onError: (error) => {
        toast('Error creando temporizadores');
        setIsLoading(false);
      },
    },
  );

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
    reset,
  } = useForm<ISettingsInput>({
    mode: 'onChange',
    defaultValues: {
      pomodoroTimer: pomodoro,
      shortTimer: shortBreak,
      longTimer: longBreak,
      interval: interval,
    },
  });

  //si hace login un usuario, restablecemos timers
  useEffect(() => {
    reset({
      interval: interval,
      shortTimer: shortBreak,
      longTimer: longBreak,
      pomodoroTimer: pomodoro,
    });
  }, [pomodoro, interval, shortBreak, pomodoro]);

  const onSubmit = async (formData: ISettingsInput) => {
    //si el formulario no es válido, no ejecuta el resto de la funcion
    if (!isValid) return;

    setPomodoro(formData.pomodoroTimer);
    setShortBreak(formData.shortTimer);
    setLongBreak(formData.longTimer);
    setInterval(formData.interval);
    setCounter(0);
    settingModal.onClose();
    router.push(ErouteNames.DEFAULT);

    if (email && sub) {
      setIsLoading(true);
      try {
        await createSettingPomodoroMutation({
          variables: {
            createSettingPomodoroInput: {
              email: email ?? '',
              id: sub ?? '',
              intervals: Number(formData.interval),
              longTimer: Number(formData.shortTimer),
              pomodoro: Number(formData.pomodoroTimer),
              shortTimer: Number(formData.shortTimer),
            },
          },
        });
      } catch (err) {
        toast('Error creando temporizadores');
      }
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Configuración NeuralClocks"
        subtitle="Configura tus temporizadores en minutos"
      />
      <div className="flex gap-4">
        <Input
          field={register('pomodoroTimer', { required: true, min: 1, max: 60 })}
          id="pomodoroTimer"
          label="Pomodoro"
          disabled={isLoading}
          errors={errors}
          type="number"
          required
        />
        <Input
          field={register('shortTimer', { required: true, min: 1, max: 60 })}
          id="shortTimer"
          label="Descanso Corto"
          disabled={isLoading}
          errors={errors}
          type="number"
          required
        />
        <Input
          field={register('longTimer', { required: true, min: 1, max: 60 })}
          id="longTimer"
          label="Descanso Latgo"
          disabled={isLoading}
          errors={errors}
          type="number"
          required
        />
      </div>

      <div className="font-light text-neutral-500 mt-2">
        Configura la cantidad de intervalos
      </div>
      <Input
        field={register('interval', { required: true, min: 1, max: 10 })}
        id="interval"
        label="Intervalos"
        disabled={isLoading}
        errors={errors}
        type="number"
        required
      />
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={settingModal.isOpen}
        title="Configuración General"
        actionLabel="Guardar"
        onClose={settingModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
      <Toaster />
    </>
  );
};

export default SettingModal;
