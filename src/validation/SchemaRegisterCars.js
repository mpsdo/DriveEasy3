import * as Yup from "yup";

export const SchemaRegisterCars = Yup.object().shape({
    name:Yup.string().required("campo obrigatório"),
    licenseplate: Yup.string().required("campo obrigatório"),
    price: Yup.number().typeError('Este campo precisa ser um número').required("campo obrigatório"),
    duration: Yup.number().typeError('Este campo precisa ser um número').required("campo obrigatório")
});


   