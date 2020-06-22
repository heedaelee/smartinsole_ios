//import BluetoothSerial from 'react-native-bluetooth-serial-next';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ToastAndroid,NativeModules, NativeEventEmitter } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BleManager } from "react-native-ble-plx"


const LEFT_INSOLE_NAME = "left insole"; 
const RIGHT_INSOLE_NAME = "right insole";

function Bluetooth({navigation}) { 

    const [devices, setDevices] = useState([]);
    const [LeftDevice, setLeft] = useState({id:"",name:"",isConnect:false});
    const [RightDevice, setRight] = useState({id:"",name:"",isConnect:false});
    const [tabSwipe,setTab] = useState(true);
    const manager = new BleManager()
    const [uuid ,setUuid] =useState("");
    const [serviceUUIDs ,setsServiceUUIDs] =useState([]);
    const [state ,setState] =useState("PoweredOn");


    useEffect(() => {
        /* console.log("gogo")
        let states = manager.onStateChange();
        if(states == "PoweredOn"){
            setState(state)
        } */
        
        // list();
        // isConnect(LeftDevice);
        // isConnect(RightDevice);
    },[]);
    const onBlu = async() => {
        if(state == "PoweredOn"){
            console.log("실행");
            scanAndConnect();
        } 
 
    }
    const  scanAndConnect = async () => {
        await manager.startDeviceScan(null,null, (error, device) => {
            if (error) {
                error(error.message)
                return
            }
            if(device.name === "L"){
                setupNotifications(device);        
            }
        });   
    }
    const setupNotifications = async (device) => {
        await manager.stopDeviceScan();
        console.log(device.serviceUUIDs);
        console.log(device.name);
        await manager.connectedDevices(device.serviceUUIDs).then(data =>{
            console.log(data);
        })

        let st = await manager.connectToDevice(device.id);
        console.log(st);
    }

    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1, alignItems:"center"}} >
			<MainView>
				<Text style={{fontSize:22, fontWeight:"bold"}}>블루투스 연결</Text>
                <View style={{marginTop:30}}>
                    <Text style={{fontSize:19, fontWeight:"bold"}}>왼쪽, 오른쪽 인솔 장치 연결</Text>
                    <Text style={{fontSize:15, color:"#d1ccc0"}}>스마트폰의 블루투스 악세서리를 연결해주세요</Text>
                </View>
                <View style={{flexDirection:"row",height:"100%",justifyContent:"space-around"}}>
                    <BluetoothBox>
                        <Text style={{fontSize:16, fontWeight:"bold"}}>왼쪽 인솔 연결</Text>
                        <Text style={{fontSize:15, color:"#d1ccc0"}}>{LeftDevice.name===""?"LEFT":LeftDevice.name}</Text>
                        <View style={{justifyContent:"center",alignItems:"center",height:"50%"}}>
                            <Icon name="check-circle" size={40}  color={LeftDevice.isConnect?"#34ace0":"#d1ccc0"} />
                        </View>
                    </BluetoothBox>
                    <BluetoothBox>
                        <Text style={{fontSize:16, fontWeight:"bold"}}>오른쪽 인솔 연결</Text>
                        <Text style={{fontSize:15, color:"#d1ccc0"}}>{RightDevice.name===""?"RIGHT":RightDevice.name}</Text>
                        <View style={{justifyContent:"center",alignItems:"center",height:"50%"}}>
                            <Icon name="check-circle" size={40}  color={RightDevice.isConnect?"#34ace0":"#d1ccc0"} />
                        </View>
                    </BluetoothBox>
                </View>
			</MainView>
            <NextBtn onPress={()=>navigation.navigate('MainRouter')}>
                <Text style={{fontSize:22, fontWeight:"bold"}}>시작하기</Text>
            </NextBtn>
        </LinearGradient>
    ) 
}

const MainView = styled.View`
	width : 90%;
    height : 50%;
    padding : 30px 25px 20px 25px;
	margin-top : 100px;
	background-color : white;
`;
const BluetoothBox = styled.View`
    width : 40%;
    height : 60%;
    margin-top : 25px;
    padding : 10px;
    border : 3px #7f8c8d;
    border-radius : 20px;
`;
const NextBtn = styled.TouchableOpacity`
    width : 80%;
    height : 55px;
    position : absolute;
    bottom : 50px;
    background-color : white;
    border-radius : 30px;
    justify-content : center;
    align-items : center;
`;

export default Bluetooth;