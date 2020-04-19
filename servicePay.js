import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { primary, secondary } from "../constant";

const styles = StyleSheet.create({
  inputTopMargin: {
    marginVertical: "2%"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  }
});

export default function ServicePay(props) {
  console.log("ServicePay");
  const theme = { colors: { primary: primary, placeholder: "grey" } };
  return (
    <View>
      <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
        <Text style={{ fontSize: 20 }}>Paiement</Text>
        <TextInput
          style={styles.inputTopMargin}
          mode="outlined"
          label="Nom prenom"
          placeholder="Jean Dupont"
          onChangeText={txt => {
            setEmail(txt);
          }}
          theme={theme}
        />
        <TextInput
          style={styles.inputTopMargin}
          mode="outlined"
          label="Numero"
          placeholder="4976 5856 1279 2685"
          onChangeText={txt => {
            setEmail(txt);
          }}
          theme={theme}
        />
        <TextInput
          style={styles.inputTopMargin}
          mode="outlined"
          label="CCV"
          placeholder="000"
          onChangeText={txt => {
            setPassword(txt);
          }}
          theme={theme}
        />
        <TextInput
          style={styles.inputTopMargin}
          mode="outlined"
          label="Date d'expiration"
          placeholder="00/00"
          onChangeText={txt => {
            setPassword(txt);
          }}
          theme={theme}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            props.navigation.navigate("ServiceMain");
          }}
          theme={{
            colors: { primary: primary }
          }}
        >
          Retour
        </Button>
        <Button
          onPress={() => {
            props.navigation.navigate("ServicePay");
          }}
          theme={{
            colors: { primary: primary }
          }}
        >
          Payer
        </Button>
      </View>
    </View>
  );
}
