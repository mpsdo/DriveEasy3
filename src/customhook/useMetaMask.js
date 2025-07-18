import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Vehicle from "../abis/Vehicle.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const useMetaMask = () => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          // Cria a instância Web3
          const web3Instance = new Web3(window.ethereum);

          // Solicita acesso à conta
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const accounts = await web3Instance.eth.getAccounts();
          if (!accounts || accounts.length === 0) {
            throw new Error('Permissão negada!');
          }
          console.log(accounts)
          setAccount(accounts[0]);
          setWeb3(web3Instance);

          const deployedContract = new web3Instance.eth.Contract(
            Vehicle.abi,
            CONTRACT_ADDRESS
          );
          setContract(deployedContract);

          console.log('Conta conectada:', accounts[0]);
        } catch (error) {
          console.error('Erro ao conectar com MetaMask:', error);
        }
      } else {
        alert('Instale o MetaMask para continuar.');
      }
    };

    connectWallet();
  }, []);

  return { web3, account, contract };
};

export const useGetBalance = (web3, address) => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (!web3 || !address) {
            return;
        } else {
            const fetchBalance = async () => {
                try {
                    const raw = await web3.eth.getBalance(address);
                    const ethBalance = web3.utils.fromWei(raw, 'ether');
                    setBalance(ethBalance);
                } catch (error) {
                    console.error('Erro ao buscar saldo:', error);
                }
            };

            fetchBalance();

        }


    }, [web3, address]);
    console.log(balance)
    return balance;
};
