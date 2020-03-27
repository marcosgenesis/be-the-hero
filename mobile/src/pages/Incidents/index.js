import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";

import {
  Container,
  Header,
  Logo,
  TextTotalCases,
  BoldText,
  Title,
  Description,
  IncidentList,
  Incident,
  IncidentPropert,
  IncidentValue,
  DetailButton,
  DetailButtonText
} from "./styles";
import logoImg from "../../assets/logo.png";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if (loading) return;
    if (total > 0 && incidents.length === total) return;

    setLoading(true);
    const response = await api.get("incidents", { params: { page } });
    console.log(response);

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  const navigation = useNavigation();
  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }
  return (
    <Container>
      <Header>
        <Logo source={logoImg}></Logo>
        <TextTotalCases>
          total de <BoldText>{total} casos</BoldText>
        </TextTotalCases>
      </Header>
      <Title>Bem-Vindo!</Title>
      <Description>Escolha um dos casos abaixo e salve o dia!</Description>
      <IncidentList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <Incident>
            <IncidentPropert>ONG</IncidentPropert>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentPropert>CASO</IncidentPropert>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentPropert>VALUE</IncidentPropert>
            <IncidentValue>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </IncidentValue>

            <DetailButton onPress={() => navigateToDetail(incident)}>
              <DetailButtonText>ver mais detalhes</DetailButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailButton>
          </Incident>
        )}
      />
    </Container>
  );
}
