import { StatusBar } from "expo-status-bar";
import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import array from "./contacts";
import { compareNames } from "./contacts";

export default class App extends React.Component {
  state = { contacts: array, show: true };

  sortContact = () => {
    //console.log("sortttttttt", this.state.contacts.sort(compareNames));
    this.setState({ contacts: [...this.state.contacts.sort(compareNames)] });
  };

  showHideFunction = () => {
    this.setState({ show: !this.state.show });
  };

  add = (a) => {
    console.log("aman");
    this.setState({ contacts: this.state.contacts.concat(a) });
  };
  render() {
    console.log("state", this.state.contacts);
    return (
      <View style={styles.container}>
        <Button title="sort" onPress={this.sortContact}></Button>

        <Button title="show/hide" onPress={this.showHideFunction} />
        <Contact
          name={this.state.contacts[0].name}
          phone={this.state.contacts[0].phone}
        />
        {/* <DisplayAll state={this.state.contacts} /> */}
        {this.state.show ? (
          <DisplayAll state={this.state.contacts} />
        ) : (
          <AddNewContact add={this.add} />
        )}

        <StatusBar style="auto" />
      </View>
    );
  }
}

function AddNewContact(props) {
  const [state, setState] = React.useState({ name: "aman", phone: "301-679" });
  console.log("addd", props.add);
  return (
    <View>
      <TextInput
        value={state.name}
        onChangeText={(text) => {
          if (text.length < 10) {
            setState({ name: text });
          }
        }}
      />
      <TextInput
        value={state.phone}
        onChangeText={(text) => {
          if (text.length < 10) {
            setState({ phone: text });
          }
        }}
      />
      <Button title="add contact" onPress={() => props.add(state)} />
    </View>
  );
}

function DisplayAll(props) {
  return (
    // <ScrollView>
    //   {props.state.map((item) => (
    //     <Text key={item.id}>
    //       {item.name}
    //       {item.phone}
    //     </Text>
    //   ))}
    // </ScrollView>

    <FlatList
      data={props.state}
      renderItem={({ item: contact }) => (
        <Contact name={contact.name} phone={contact.phone} />
      )}
      keyExtractor={(contact) => contact.id}
    />
  );
}

function Contact({ name, phone }) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{phone}</Text>
    </View>
  );
}
Contact.prototypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
