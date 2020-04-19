import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  TouchableOpacity,
  Platform
} from "react-native";
import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { changeImg } from "../../redux/actions/serviceImg";
import { connect } from "react-redux";

const infostyle = StyleSheet.create({
  title: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
    paddingTop: 20,
    color: "grey"
  },
  date: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "grey"
  },
  address: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    color: "grey"
  },
  dateContainer: { paddingBottom: 50 },
  flex: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  },
  flexNo: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bulle: {
    width: "96%",
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    marginHorizontal: "2%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white"
  }
});

function Info(props) {
  let detail = props.route.params;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      props.dispatch(changeImg(props.route.params.imgUrl));
      console.log("Something");
    });
    return unsubscribe;
  });

  return (
    <ScrollView>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height / 3.5,
          marginBottom: 20
        }}
        region={{
          latitude: detail.infos.lat,
          longitude: detail.infos.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: detail.infos.lat,
            longitude: detail.infos.lng
          }}
          title={detail.infos.nom}
        />
      </MapView>

      <View style={infostyle.dateContainer}>
        <Description description={detail.infos.description}></Description>
        <Horaire style={infostyle.bulle} horaires={detail.horaires}></Horaire>

        <View style={infostyle.bulle}>
          <Text style={infostyle.title}>Contact</Text>
          <TouchableOpacity
            style={infostyle.flex}
            onPress={() => Linking.openURL("tel:" + detail.infos.contacts)}
          >
            <Text style={infostyle.date}>Tel:</Text>
            <Text style={infostyle.date}>{detail.infos.contacts}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "ios") {
                Linking.openURL(
                  `http://maps.apple.com/?daddr=${detail.infos.adresse}`
                );
              } else {
                Linking.openURL(
                  `http://maps.google.com/?daddr=${detail.infos.adresse}`
                );
              }
            }}
          >
            <View style={infostyle.flexNo}>
              <Text style={infostyle.date}>Adresse:</Text>
              <Text style={infostyle.address}>{detail.infos.adresse}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function Description(props) {
  if (!props.description) return null;
  return (
    <View style={infostyle.bulle}>
      <Text style={infostyle.title}>Description</Text>
      <Text style={{ marginHorizontal: 10, color: "grey" }}>
        {props.description}
      </Text>
    </View>
  );
}

function Horaire(props) {
  let flex = infostyle.flex;

  if (props.horaires.length) {
    return (
      <View style={infostyle.bulle}>
        <Text style={infostyle.title}>Horaires</Text>
        {props.horaires.map((el, key) => {
          let lastElem = key + 1 == props.horaires.length;

          if (lastElem) flex = infostyle.flexNo;
          if (!el.ferme) {
            return (
              <View style={flex} key={key}>
                <Text style={infostyle.date}>{el.jour}</Text>
                <Text style={infostyle.date}>{el.heure}</Text>
              </View>
            );
          } else {
            return (
              <View style={flex} key={key}>
                <Text style={infostyle.date}>{el.jour}</Text>
                <Text style={infostyle.date}>Fermé</Text>
              </View>
            );
          }
        })}
      </View>
    );
  }
  return null;
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Info);
