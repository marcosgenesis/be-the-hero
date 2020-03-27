import React from "react";
import * as MailComposer from "expo-mail-composer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  Logo,
  Incident,
  IncidentPropert,
  IncidentValue,
  ContactBox,
  HeroTitle,
  HeroDescription,
  Actions,
  Action,
  ActionText
} from "./styles";

import logoImg from "../../assets/logo.png";

export default function Detail() {
  const route = useRoute();
  const incident = route.params.incident;
  const navigation = useNavigation();
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${incident.value}`;

  function navigateBack(params) {
    navigation.goBack();
  }
  function sendMail(params) {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }
  function sendWhatsapp(params) {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}text=${message}`
    );
  }
  return (
    <Container>
      <Header>
        <Logo source={logoImg}></Logo>
        <TouchableOpacity>
          <Feather
            name="arrow-left"
            size={28}
            color="#e02041"
            onPress={navigateBack}
          />
        </TouchableOpacity>
      </Header>
      <Incident>
        <IncidentPropert style={{ marginTop: 0 }}>ONG</IncidentPropert>
        <IncidentValue>
          {incident.name} de {incident.city}/{incident.uf}
        </IncidentValue>

        <IncidentPropert>CASO</IncidentPropert>
        <IncidentValue>{incident.description}</IncidentValue>

        <IncidentPropert>VALUE</IncidentPropert>
        <IncidentValue>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </IncidentValue>
      </Incident>
      <ContactBox>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o herói desse caso</HeroTitle>
        <HeroDescription>Seja o herói desse caso</HeroDescription>

        <Actions>
          <Action onPress={sendWhatsapp}>
            <ActionText>Whatsapp</ActionText>
          </Action>
          <Action onPress={sendMail}>
            <ActionText>Email</ActionText>
          </Action>
        </Actions>
      </ContactBox>
    </Container>
  );
}
