import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Partcipant } from "../../components/Participant";
import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<Array<string>>([]);
  const [participantName, setParticipantName] = useState("");

  const handleParticipantAdd = (participantName: string) => {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante Existe",
        "Já existe um participante na lista com esse nome"
      );
    }

    setParticipants((oldState) => [...oldState, participantName]);
    setParticipantName("");
  };

  const removeParticipant = (name: string) => {
    setParticipants((oldState) => {
      return oldState.filter((participant) => participant !== name);
    });
  };

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          removeParticipant(name);
          Alert.alert(
            "Removido",
            `O participante ${name} foi removido da sua lista.`
          );
        },
        style: "destructive",
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Pau no cu da girafa</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          inputMode="text"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <Pressable
          style={styles.button}
          onPress={() => handleParticipantAdd(participantName)}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Partcipant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </View>
  );
}
