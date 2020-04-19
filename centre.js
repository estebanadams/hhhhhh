import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Linking,
  FlatList
} from "react-native";
import { changeImg } from "../../redux/actions/serviceImg";

import IconMa from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "90%",
    marginTop: 10,
    marginBottom: 10,

    marginHorizontal: "5%",
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
  },
  headerImage: {},
  center: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  centerTitle: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  title: {
    fontSize: 17,
    color: "grey",
    width: "75%",
    paddingRight: "5%"
  },
  distance: {
    width: "20%",
    fontSize: 17,
    color: "grey"
  },
  desc: {
    color: "grey"
  },
  imageContainer: {
    height: props.height,
    width: "100%"
  },
  brokenImageIcon: { textAlign: "center", paddingTop: 50, color: "grey" }
});

function Img(props) {
  if (props.imgUrl) {
    return (
      <Image
        resizeMode={"cover"}
        style={styles.imageContainer}
        source={{ uri: props.imgUrl }}
      />
    );
  } else {
    return (
      <View style={styles.imageContainer}>
        <IconMa
          name="broken-image"
          size={30}
          style={styles.brokenImageIcon}
        ></IconMa>
      </View>
    );
  }
}

function Centre({ navigation, detail, dispatch }) {
  let title =
    detail.infos.nom[0].toUpperCase() + detail.infos.nom.toLowerCase().slice(1);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("CentreDetail", detail);
        dispatch(changeImg(detail.imgUrl));
      }}
    >
      <Img imgUrl={detail.imgUrl} height={100}></Img>
      <View style={styles.center}>
        <View style={styles.centerTitle}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.distance}>{detail.infos.distance}</Text>
        </View>
        <View style={styles.centerTitle}>
          <Text numberOfLines={1} style={{ width: "75%" }}>
            {detail.typesPrestation.map((el, key) => {
              return (
                <Text key={key} style={styles.desc}>
                  {el + " "}
                </Text>
              );
            })}
          </Text>

          <Text style={styles.desc}>{detail.infos.duree}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function mapStateToProps(state) {
  return { imgUrl: state.serviceImg };
}

export default connect(mapStateToProps)(Centre);
