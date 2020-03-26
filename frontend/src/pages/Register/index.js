import React from "react";
import { Form } from "@unform/web";
import Input from "../../components/Input";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Container } from "./styles";
import logo from "../../assets/logo.svg";

export default function Register() {
  const history = useHistory();
  async function handleRegister(data) {
    try {
      const response = await api.post("ongs", data);
      alert(`Seu id de acesso: ${response.data.id}`);
      history.push("/");
    } catch (error) {
      alert("Erro no cadastro, tente novamente");
    }
  }
  return (
    <Container>
      <div className="content">
        <section>
          <img src={logo} alt="" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
            Voltar para Logon
          </Link>
        </section>
        <Form onSubmit={handleRegister}>
          <Input name="name" type="text" placeholder="Nome da ONG" />
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="whatsapp" placeholder="Whatsapp" />
          <div className="input-group">
            <Input name="city" type="text" placeholder="Cidade" />
            <Input
              name="uf"
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </Form>
      </div>
    </Container>
  );
}
