import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  FlatList,
  Image
} from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      isLoading: true,
      threads: []
    }
  }

  componentDidMount(){
　　fetch("https://www.reddit.com/r/newsokur/hot.json")
     .then((response) => response.json())
     .then((responseJson) => {
       let threads =
       responseJson.data.children
       threads = threads.map(i =>{
         i.key = i.data.url
         return i
       })
       this.setState({threads: threads, isLoading: false})
     })
     .catch((error) => {
       console.error(error);
     })
  }


  render() {
    const { threads, isLoading } = this.state
    const { width } = Dimensions.get('window')
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      {isLoading ?
        <ActivityIndicator /> :
      
      <FlatList
      data={threads}
      renderItem = {({item}) => {
        return(
          <View style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%'
          }}>
          <Image
            style={{
              width: 50,
              height: 50
            }}
            source={{uri: item.data.thumbnail}}
            />
            <View style={{ width: width - 50 }}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text>{item.data.title}</Text>
                <Text style={{color: '#ababab', fontSize: 10}}>{item.data.domain}</Text>
              </View>
            </View>
          </View>
        )
      }}
      /> }
      </View>
    );
  }
}