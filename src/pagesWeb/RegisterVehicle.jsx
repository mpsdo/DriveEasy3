import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaRegisterCars } from "../validation/SchemaRegisterCars";
import { useMetaMask } from "../customhook/useMetaMask";

const RegisterVehicle = () => {
    const { web3, account, contract } = useMetaMask();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SchemaRegisterCars)
    });

    const onSubmit = async (data) => {


        console.log(data)
        if (!web3 || !contract || !account) {
            alert("Blockchain não está pronta. Verifique MetaMask.");
            return;
        }

        try {
            const { name: model, licenseplate: licensePlate, price: pricePerDay, duration } = data;
            console.log(model)
            const priceInWei = web3.utils.toWei(pricePerDay, 'ether');
            const durationNumber = Number(duration);
            console.log("Dados enviados:", { model, licensePlate, priceInWei, durationNumber });
            console.log("Tipo de priceInWei:", typeof priceInWei);
            console.log("Tipo de durationNumber:", typeof durationNumber);

            await contract.methods.addCar(model, licensePlate, priceInWei, durationNumber).send({ from: account, gas: 300000 });
            alert("Cadastrado com sucesso!!!");
            reset();

        } catch (err) {
            alert("Erro ao cadastrar o veiculo. " + err);
            console.log(err)

        }


    }

    return (
        <div id="container3">
            <header>
                <h1 style={{ color: "green" }}>Cadastrar Veiculos</h1>
            </header>
            <section>
                <form>
                    <input type="text" id="name" {...register("name")} placeholder="Modelo do Veículo" name="name" />
                    <div style={{ fontSize: "14px", color: "red" }}>{errors.name?.message}</div>
                    <input type="text" id="licenseplate"  {...register("licenseplate")} placeholder="identificador (placa)" name="licenseplate" />
                    <div style={{ fontSize: "14px", color: "red" }}>{errors.licenseplate?.message}</div>
                    <input type="text" id="price" {...register("price")} placeholder="valor do aluguel (ETH)" name="price" />
                    <div style={{ fontSize: "14px", color: "red" }}>{errors.price?.message}</div>
                    <input type="text" id="duration" {...register("duration")} placeholder="duração máxima que pode alugar(em dias)" name="duration" />
                    <div style={{ fontSize: "14px", color: "red" }}>{errors.duration?.message}</div>
                </form>
                <div id="send_form">
                    <h4 className="btn1" onClick={handleSubmit(onSubmit)}>Cadastrar veículo</h4>
                    <Link to="/" style={{ textDecoration: "none", color: "white" }} > <h4 className="btn2">Voltar</h4></Link>
                </div>
            </section>

        </div>
    );
}


export default RegisterVehicle;