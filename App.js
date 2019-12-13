/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, FlatList, Image,ActivityIndicator,TouchableOpacity,ToastAndroid } from 'react-native'



export default class App extends Component {
  //java의 생성자 같은 스크립트(this.state -> 값이 변경이 되는 스크립트를 정의 할때 사용합니다)
  constructor() {
    super()
    this.state = {
      dataSource: [],
      isLoading:true
    }
  }

  //json 데이터 소스를 이용하여 사용자가 보여주고 싶은 형태로 보여주는 스크립트
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{flex:1, flexDirection:'row',marginBottom:3}}
          onPress={()=>ToastAndroid.show(item.book_title,ToastAndroid.SHORT)}>
        <Image style={{width:100, height:100,margin:5}}
          source={{ uri: item.image }}
        />
        <View style={{flex:1, justifyContent:'center',marginLeft:5}}>
          <Text style={{fontSize:18, color:'green',marginBottom:15}}>
            {item.book_title}
          </Text>
          <Text style={{fontSize:16, color:'red'}}>
            {item.author}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }
  renderSeparator=()=>{
    return(
      <View
          style={{height:1, width:'100%', backgroundColor:'black'}}>

      </View>
    )
  }

  //json url이용하여 데이터소스를 가지고 오는 자바스크립트
  componentDidMount() {
    const url='https://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1'
    fetch(url)

      .then((_reponse) => _reponse.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.book_array,
          isLoading:false
        })


      })
      .catch((error) => {
        console.log(error)
      })
  }



  render() {
    //<ActivityIndicator> json 데이터를 가지고 올때 로딩 바퀴를 보여주는 스크립트
    if(this.state.isLoading){
      return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator style="Large" color="#330066" animating/>
        </View>
      )
    }
    return (
     

      <View sytle={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(_item,index)=>index}
          ItemSeparatorComponent={this.renderSeparator}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  }

})