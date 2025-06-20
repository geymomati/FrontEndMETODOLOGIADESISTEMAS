import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
  firstName: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  username: yup.string().required('El usuario es obligatorio'),
  password: yup
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .required('La contraseña es obligatoria'),
  phone: yup
    .string()
    .min(10, 'Teléfono invalido')
    .required('El teléfono es obligatorio'),
});

export type RegisterData = yup.InferType<typeof RegisterSchema>;
