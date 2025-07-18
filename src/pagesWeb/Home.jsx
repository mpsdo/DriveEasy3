import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import { useState} from "react";
import img8 from "../image/img8.jpg";
import { useNavigate } from "react-router-dom";
import { useMetaMask } from "../customhook/useMetaMask";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [rentalDays, setRentalDays] = useState({});
  const navigate = useNavigate();
  const { web3, account, contract } = useMetaMask();


  // Alugar veículo com número de dias
  async function handleRent(car) {
    if (!web3 || !contract || !account) {
      alert("Blockchain ou conta MetaMask não disponível.");
      return;
    }

    const days = rentalDays[car.id];
    if (!days || isNaN(days) || days <= 0) {
      alert("Informe uma duração válida.");
      return;
    }

    try {
      const totalPrice = parseFloat(car.price) * parseInt(days);
      const priceInWei = web3.utils.toWei(totalPrice.toString(), "ether");

      await contract.methods.rentCar(car.id, days).send({
        from: account,
        value: priceInWei,
      });

      alert("Alugado com sucesso!");
      navigate(0); // recarrega
    } catch (error) {
      console.error("Erro ao alugar veículo:", error);
      alert("Erro ao alugar: " + error.message);
    }
  }

  // Verifica se há carros
  async function GetProductVehicle() {

    if (contract && web3) {     
    
      try {
        const result = await contract.methods.getAllCars().call();
        console.log(result[0].length === 0)
        if (result[0].length === 0) {
          alert("Nenhum veículo cadastrado para alugar!!!")
        }

        const carList = result[0].map((id, index) => ({
          id,
          model: result[1][index],
          plate: result[2][index],
          price: web3.utils.fromWei(result[3][index], 'ether'),
          duration: result[4][index],
          available: result[5][index],
          renter: result[6][index],
        }));
        setCars(carList);
      } catch (error) {
        console.log("Erro ao buscar carros:", error);
      }
    }


  }

  // Atualiza dias de aluguel
  function updateRentalDays(carId, value) {
    setRentalDays(prev => ({ ...prev, [carId]: value }));
  }

  return (
    <div id="container">
      <header>
        <Header />
      </header>

      <section>
        {cars.length > 0 ? (
          cars.map((item, index) => (
            <div key={index} className="card">
              <img src={img8} alt="carro" />
              <div style={{ marginTop: "23px" }}>
                <h4><span style={{ color: "blue" }}>Veículo:</span> {item.model}</h4>
                <h4><span style={{ color: "blue" }}>Placa:</span> {item.plate}</h4>
                <h4><span style={{ color: "blue" }}>Preço:</span> {item.price} ETH/dia</h4>

                {item.available ? (
                  <>
                    <input
                      type="number"
                      placeholder="Dias"
                      min="1"
                      max={item.duration}
                      value={rentalDays[item.id] || ""}
                      onChange={e => updateRentalDays(item.id, e.target.value)}
                      style={{
                        marginTop: "1px",
                        padding: "6px",
                        width: "80px",
                        color: "black",
                        border: "none",
                        outline: "none",
                        borderBottom: "2px solid white",
                        backgroundColor: "bisque",
                      }}
                    />
                    <button
                      onClick={() => handleRent(item)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Alugar
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#ccc",
                      color: "#777",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px"
                    }}
                  >
                    Alugado
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <span style={{ color: "red" }}>
            * Aperte o botão ao lado para listar os veículos!
          </span>
        )}
      </section>

      <aside>
        <Dashboard onClickGetVehicles={GetProductVehicle} />
      </aside>
    </div>
  );
};

export default Home;