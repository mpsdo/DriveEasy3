import { useState, useEffect } from "react";
import { useMetaMask } from "../customhook/useMetaMask";

const HistoryVehicle = () => {
  const [listVehicleRent, setListVehicleRent] = useState([]);
  const { web3, account, contract } = useMetaMask();

  useEffect(() => {
    const fetchRentalHistory = async () => {
      if (!web3 || !contract || !account) {
        console.warn("Blockchain não conectada ou MetaMask não detectada.");
        return;
      }

      try {
        const result = await contract.methods.getRentalHistory(account).call();
        console.log("Retorno do contrato:", result);


        // Verifica e extrai as propriedades do retorno
        const carIds = result.carIds || result[0];
        const durations = result.durations || result[1];
        const models = result.models || result[2];
        const plates = result.plates || result[3];
        const prices = result.prices || result[4];

        // Mapeia os dados em uma lista organizada
        const historyList = carIds.map((id, index) => ({
          carId: id,
          duration: durations[index],
          model: models[index],
          plate: plates[index],
          price: prices[index],
        }));

        setListVehicleRent(historyList);
      } catch (error) {
        console.error("Erro ao buscar histórico de aluguéis:", error);
      }
    };

    fetchRentalHistory();
  }, [web3, contract, account]);

  return (
    <div id="container3">
      <header>
        <h1 style={{ color: "green", textAlign: "center" }}>Histórico de Aluguéis</h1>
      </header>

      <section style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ overflowX: "auto", width: "99%" }}>
          <table border="1" cellPadding="10" style={{ backgroundColor: "#fff", width: "100%" }}>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Placa</th>
                <th>ETH por Dia</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              {listVehicleRent.length > 0 ? (
                listVehicleRent.map((item, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{item.model}</td>
                    <td style={{ textAlign: "center" }}>{item.plate}</td>
                    <td style={{ textAlign: "center" }}>{item.price}</td>
                    <td style={{ textAlign: "center" }}>{item.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                    Nenhum histórico de aluguel encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HistoryVehicle;