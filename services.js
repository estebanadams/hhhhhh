import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ServiceDetail from "./serviceDetail";
import ServiceMain from "./serviceMain";
import ServicePay from "./servicePay";
import ServiceResa from "./serviceResa";

const ServiceStack = createStackNavigator();

export default function Service(props) {
  let detail = props.route.params;
  console.log("SERVICES", detail.infos.nom);
  return (
    <ServiceStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <ServiceStack.Screen
        name="ServiceMain"
        component={ServiceMain}
        initialParams={detail}
      ></ServiceStack.Screen>
      <ServiceStack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{ title: detail.infos.nom }}
        initialParams={detail}
      ></ServiceStack.Screen>

      <ServiceStack.Screen
        name="ServicePay"
        component={ServicePay}
        initialParams={detail}
      ></ServiceStack.Screen>
      <ServiceStack.Screen
        name="ServiceResa"
        component={ServiceResa}
        initialParams={detail}
      ></ServiceStack.Screen>
    </ServiceStack.Navigator>
  );
}
