import React from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
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
       this.setState({threads})
     })
     .catch((error) => {
       console.error(error);
     })
  }


  render() {
    const { threads } = this.state
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <FlatList
      data={threads}
      renderItem = {({item}) => {
        return(
          <View>
            <Text>
              {item.data.title}
            </Text>
          </View>
        )
      }}
      />
      </View>
    );
  }
}