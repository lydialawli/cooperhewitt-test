import React, { Component } from 'react';
import { ACCESS_TOKEN } from 'react-native-dotenv';
import {
  StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button, ScrollView
} from 'react-native';
import * as Font from 'expo-font';
import { Linking } from 'expo';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      exhibitions: [],
      fullSizedCard: null
    }
  }

  componentDidMount() {
    Font.loadAsync({
      'Rubik-light': require('./assets/fonts/Rubik-Light.ttf'),
      'Rubik-normal': require('./assets/fonts/Rubik-Medium.ttf'),
      'Rubik-bold': require('./assets/fonts/Rubik-Bold.ttf')
    })

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

  handlePressCard = (i) => {
    if (this.state.fullSizedCard === i) {
      this.setState({
        fullSizedCard: null
      })
    }
    else {
      this.setState({
        fullSizedCard: i
      })
    }
  }

  openUrl = (e) => {
    Linking.openURL(e.url);
  }

  renderItem = (item, index) => {

    return <TouchableOpacity key={item.id} style={styles.list} onPress={() => this.handlePressCard(index)}>
      <Text style={styles.title}>{item.title.toUpperCase()}</Text>
      {this.state.fullSizedCard === index ? <Text style={styles.textLight}>{item.text}</Text> : <Text ellipsizeMode='tail' numberOfLines={3} style={styles.textLight}>{item.text}</Text>}

      <View style={styles.wrapDates}>
        <View>
          <Text style={styles.textMedium}>Starts</Text><Text style={styles.textLight}>{item.date_start}</Text>
        </View>
        <Button title="more details" color="#FF5700" onPress={() => this.openUrl(item)}></Button>
        <View>
          <Text style={styles.textMedium}>Ends</Text><Text style={styles.textLight}>{item.date_end}</Text>
        </View>
      </View>
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
        <View style={styles.header}><Text style={styles.title}>LIST OF EXHIBITIONS</Text></View>
        <ScrollView>
          {this.state.exhibitions.map((e, i) => {
            return <View style={styles.card} key={i}>{this.renderItem(e, i)}</View>
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

  header: {
    height: 60,
    backgroundColor: '#FF5700',
    width: '100%',
    elevation:5
  },

  title: {
    fontFamily: 'Rubik-bold',
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

  card: {
    // backgroundColor: 'pink',
    margin: 20,
    padding: 20,
    borderRadius: 1,
    elevation: 2,
    shadowOpacity: 0.3,
  },

  textLight: {
    fontFamily: 'Rubik-light',
  },

  textMedium: {
    fontFamily: 'Rubik-normal',
  },

  wrapDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  },

});
