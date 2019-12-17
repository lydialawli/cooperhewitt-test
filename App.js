import React, { Component } from 'react';
import { ACCESS_TOKEN } from 'react-native-dotenv';
import {
  StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView
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
        // console.log('data is: ', res.exhibitions.length)
        this.setState({
          loading: false,
          exhibitions: res.exhibitions
        })
      })
      .catch(error => console.log(error))
  }

  renderItem = (item) => {
    return <TouchableOpacity key={item.id} style={styles.list}>
      <Text style={styles.title}>{item.title.toUpperCase()}</Text>
      <Text style={styles.lightText}>{item.text}</Text>
    </TouchableOpacity>
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
        <ScrollView>
          {this.state.exhibitions.map((e, i) => {
            return <View style={styles.box} key={i}>{this.renderItem(e)}</View>
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black'
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  box: {
    backgroundColor: 'pink',
    margin: 20,
    padding: 20
  },

  list: {
    // backgroundColor: "grey",
    flex: 1
  }
});
