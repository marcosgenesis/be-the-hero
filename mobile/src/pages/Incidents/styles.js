import styled from "styled-components/native";
import constants from "expo-constants";

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${constants.statusBarHeight + 20}px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Logo = styled.Image``;
export const TextTotalCases = styled.Text`
  font-size: 15px;
  color: #737380;
`;
export const BoldText = styled.Text`
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 16px;
  margin-top: 48px;
  color: #13131a;
  font-weight: bold;
`;
export const Description = styled.Text`
  font-size: 16px;
  line-height: 64px;
  color: #737380;
`;

export const IncidentList = styled.FlatList`
  margin-top: 10px;
`;
export const Incident = styled.View`
  padding: 24px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 16px;
`;
export const IncidentPropert = styled.Text`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
`;
export const IncidentValue = styled.Text`
  margin-top: 8px;
  font-size: 15px;
  margin-bottom: 24px;
  color: #737380;
`;
export const DetailButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DetailButtonText = styled.Text`
  color: #e02041;
  font-size: 15px;
  font-weight: bold;
`;
