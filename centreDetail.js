import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import IconMa from "react-native-vector-icons/MaterialIcons";
import Service from "./services";

import Info from "./infos";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { connect } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const detailStyle = StyleSheet.create({
  brokenImageIcon: { textAlign: "center", paddingTop: 50, color: "grey" },
  imageContainer: {
    height: props.height,
    width: "100%"
  }
});

function Img(props) {
  if (props.imgUrl) {
    return (
      <Image
        resizeMode={"cover"}
        style={detailStyle.imageContainer}
        source={{ uri: props.imgUrl }}
      />
    );
  } else {
    return (
      <View style={detailStyle.imageContainer}>
        <IconMa
          name="broken-image"
          size={30}
          style={detailStyle.brokenImageIcon}
        ></IconMa>
      </View>
    );
  }
}

function CentreDetail({ navigation, route, dispatch, imgUrl }) {
  const { params } = route;
  let title =
    params.infos.nom[0].toUpperCase() + params.infos.nom.toLowerCase().slice(1);
  navigation.setOptions({ title: title });
  return (
    <View style={{ flex: 1 }}>
      <Img imgUrl={imgUrl} height={150} />
      <NavigationContainer independent={true}>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontSize: 12 },
            pressColor: "black",
            borderColor: "red",
            style: { borderColor: "red" }
          }}
        >
          {params.prestations.length ? (
            <Tab.Screen
              name="Services"
              component={Service}
              initialParams={params}
            />
          ) : null}
          {/* <Tab.Screen name="Avis" component={Avis} /> */}

          <Tab.Screen name="Info" component={Info} initialParams={params} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

function mapStateToProps(state) {
  return { imgUrl: state.serviceImg };
}

export default connect(mapStateToProps)(CentreDetail);
