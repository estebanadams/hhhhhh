import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { changeImg } from "../../redux/actions/serviceImg";

import { connect } from "react-redux";

const service = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  }
});

function ServiceMain(props) {
  // console.log("ServiceMain", props.navigation);
  let detail = props.route.params;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      props.dispatch(changeImg(props.route.params.imgUrl));
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <ScrollView
      style={{
        flex: 1,
        height: "100%"
      }}
    >
      {detail.prestations.map((el, key) => {
        return (
          <TouchableOpacity
            key={key}
            style={service.item}
            onPress={() => {
              props.navigation.navigate("ServiceDetail", { el: el });
              props.dispatch(changeImg(el.imgUrl));
              console.log("ELL", el);
            }}
          >
            <Text>{el.prestation}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return { imgUrl: state.serviceImg };
}

export default connect(mapStateToProps)(ServiceMain);
