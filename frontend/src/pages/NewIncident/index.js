import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import Input from "../../components/Input";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";
import { Container } from "./styles";
import logo from "../../assets/logo.svg";

export default function NewIncident() {
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const [description, setDescription] = useState("");

  if (ongId === null) history.push("/");
  async function handleNewIncident({ title, value }) {
    try {
      await api.post(
        "incidents",
        { title, value, description },
        { headers: { Authorization: ongId } }
      );
      history.push("/profile");
    } catch (error) {
      toast.error("Erro ao cadastrar caso, tente novamente!");
    }
  }
  return (
    <Container>
      <div className="content">
        <section>
          <img src={logo} alt="" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente parar encontrar um herói para
            resolver isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
            Voltar para Home
          </Link>
        </section>
        <Form onSubmit={handleNewIncident}>
          <Input name="title" type="text" placeholder="Titulo do caso" />
          <textarea
            placeholder="Descrição"
            onChange={e => setDescription(e.target.value)}
          />
          <Input name="value" placeholder="Valor em reais" />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </Form>
      </div>
    </Container>
  );
}
