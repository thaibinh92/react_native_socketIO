import React,{Component} from 'react';
import {View, Text,TextInput,TouchableOpacity} from 'react-native';
import io from 'react-native-socket.io-client';
var that;
export default class App extends Component{
    constructor(props){
        super(props);
        that=this;
        this.socket = io('http://192.168.1.9:3000',{json:false});
        this.state={
            maunen:'green',
            text:''
        }

        this.socket.on('server-send-color',function(data){
            that.setState({
                maunen:data
            });
        })
    }
    clickMe(){
        this.socket.emit('client-send-color',this.state.text)

    }
    render(){
        return(
            <View style={{ flex:1,justifyContent:'center',backgroundColor:this.state.maunen.toLowerCase(),alignItems:'center' }}>
                <TextInput
                    style={{height: 40,width:300, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity onPress={()=>{this.clickMe()}} >
                    <Text>
                        Change Color
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}