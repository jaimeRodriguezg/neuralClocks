"use client";
import { FC, useState } from "react";
import useSettingModal from "@/app/hooks/useSettingsModal";
import { ISettingsInput } from "@/app/types/setting";
import { useForm } from "react-hook-form";
import Heading from "../heading/Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const SettingModal = () => {
  const settingModal = useSettingModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISettingsInput>({
    mode: "onChange",
    defaultValues: {
      pomodoroTimer: 0,
      longTimer: 0,
      shortTimer: 0,
      interval: 0,
    },
  });

  const onSubmit = (formData: ISettingsInput) => {
    //si el formulario no es válido, no ejecuta el resto de la funcion
    if (!isValid) return;

    console.log(formData);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Configuración NeuralClocks"
        subtitle="Configura tus temporizadores en minutos"
      />
      <div className="flex gap-4">
        <Input
          field={register("pomodoroTimer", { min: 0 })}
          id="pomodoroTimer"
          label="Pomodoro"
          disabled={isLoading}
          errors={errors}
          min={0}
          required
        />
        <Input
          field={register("shortTimer", { min: 0 })}
          id="shortTimer"
          label="shortTimer"
          disabled={isLoading}
          errors={errors}
          min={0}
          required
        />
        <Input
          field={register("longTimer", { min: 0 })}
          id="longTimer"
          label="longTimer"
          disabled={isLoading}
          errors={errors}
          min={0}
          required
        />
      </div>

      <div className="font-light text-neutral-500 mt-2">
        Configura cantidad de intervalos
      </div>
      <Input
        field={register("interval", { min: 0 })}
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
