import React from "react";
import { Form } from "@unform/web";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { Container } from "./styles";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon() {
  const history = useHistory();
  async function handleSubmit(data) {
    try {
      const response = await api.post("/session", data);
      localStorage.setItem("ongId", data.id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    } catch (error) {
      toast.error("Falha no Login, tente novamente");
    }
  }
  return (
    <Container>
      <section className="form">
        <img src={logoImg} alt="" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu Logon</h1>
          <Input name="id" type="text" placeholder="Sua ID" />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041"></FiLogIn>
            Não tenho cadastro
          </Link>
        </Form>
      </section>
      <img src={heroesImg} alt="" />
    </Container>
  );
}
