import React, { Component } from 'react';
import { ACCESS_TOKEN } from 'react-native-dotenv';
import {
  StyleSheet, Text, View, ActivityIndicator,
  FlatList, TouchableOpacity
} from 'react-native';

// ApiClient.init(ACCESS_TOKEN)

export default class App extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "List of Exhibitions",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { textAlign: "center", flex: 1 }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      exhibitions: []
    }
  }

  componentDidMount() {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getList&access_token=${ACCESS_TOKEN}&page=1&per_page=100`)
      .then(response => response.json())
      .then((res) => {
        // console.log('data is: ', res)
        this.setState({
          loading: false,
          exhibitions: res
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
});
