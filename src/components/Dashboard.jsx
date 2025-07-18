import { Link } from "react-router-dom";
import { useMetaMask } from "../customhook/useMetaMask";


const Dashboard = ({onClickGetVehicles}) => {
        return (
        <>
            <div id="dashboard">
                <button >
                   <Link to ="/cadastrarCarros" style={{ textDecoration: "none", color: "white" }}>Cadastrar veículo</Link>
                </button>
               <button onClick={onClickGetVehicles}>
                    Listar veículo
                </button>
                <button>
                     <Link to ="/historico" style={{ textDecoration: "none", color: "white" }}>Ver Meus alugueis</Link>
                </button>

            </div>


        </>
    )

}

export default Dashboard;