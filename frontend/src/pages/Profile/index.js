import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Container } from "./styles";

import logo from "../../assets/logo.svg";

export default function Profile() {
  const history = useHistory();
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  if (ongId === null) history.push("/");

  useEffect(() => {
    async function loadIncidents() {
      const { data } = await api.get("/profile", {
        headers: { Authorization: ongId }
      });
      setIncidents(data);
    }
    loadIncidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongId }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      toast.error("Erro em deletar caso, tente novamente");
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <Container>
      <header>
        <img src={logo} alt="" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button onClick={() => handleLogout()}>
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.length === 0 ? (
          <p className="emptyCases">Nenhum caso cadastrado</p>
        ) : (
            incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO</strong>
                <p>{incident.title}</p>
                <strong>DESCRIÇÃO</strong>
                <p>{incident.description}</p>
                <strong>VALOR</strong>
                <p>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(incident.value)}
                </p>
                <button onClick={() => handleDeleteIncident(incident.id)}>
                  <FiTrash2 size={20} color="#a8a8a3"></FiTrash2>
                </button>
              </li>
            ))
          )}
      </ul>
    </Container>
  );
}
