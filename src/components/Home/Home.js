import React, { useEffect, useState } from 'react';
import { StyleSheet ,StatusBar, Image, AsyncStorage } from 'react-native';
import { Text, View, Button, Thumbnail } from 'native-base'; //사용하지않을예정 수정필요
import LinearGradient from 'react-native-linear-gradient'; //그라데이션 모듈
import styled from 'styled-components';
import Splash from 'react-native-splash-screen';
import Axios from 'axios';

const SITE_URL = "http://foot.chaeft.com:8080/api";
const API = "/user/get?token=";

function Home({navigation}) {
	const [token, setToken] = useState("");
	useEffect(() => {
		autoLogin();
	},[])

	const autoLogin = async () => {
		await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
			if(data != null) { 
				setToken(data.token);
				loadUserData(data.token);
			} else {
				Splash.hide();
			}
		})
	}
    const loadUserData = async (storageToken) => {
        await Axios.get(SITE_URL+API+storageToken)
        .then(res=>{ 
			if(res.data.success) {
				navigation.reset({
					index:0,
					routes:[{name:"Bluetooth"}]
				});
			} else {
				alert("토큰정보가 만료되었습니다");
				AsyncStorage.clear();
				Splash.hide();
				ToastAndroid.show("토큰 정보를 확인해주세요",ToastAndroid.SHORT);
			}
		}).catch(err=>{
			console.log("err :" + err);
			ToastAndroid.show(JSON.stringify(err),ToastAndroid.SHORT);
		});
	}

	return (
		<LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#65C5FF', '#0ED2F7']} style={css.linearGradient}>
			<StatusBar hidden={true}/>
			<View style={css.wrapView}>
				<View style={css.logoView}>
					<Thumbnail style={css.logo} square/>
					<Button style={css.joinBtn} onPress={()=>navigation.navigate('Join')}>
						<Text style={{color:"black",fontSize:22,fontWeight:"bold"}}>회원가입</Text>
					</Button>
				</View>
				<View style={css.socialView}>
					<View style={{flexDirection:"row",alignItems:"center"}}>
						<View style={{width:"30%",height:2, backgroundColor:"#fff"}}/>
						<Text style={{color:"#fff",fontSize:18, marginHorizontal:20}}>간편로그인</Text>
						<View style={{width:"30%",height:2, backgroundColor:"#fff"}}/>
					</View>
					<View style={{width:"90%", flexDirection:"row", justifyContent:"space-around", marginTop:20 }}>
						<View style={{alignItems:"center"}}>
							<Button style={css.socialBtn} onPress={()=>navigation.navigate('Social')}>
								<Image style={{width:95, height:95}} source={require('../../image/kakaotalk.png')}/>
							</Button>
							<Text style={{color: "#fff"}}>카카오톡</Text>
						</View>
						<View style={{alignItems:"center"}}>
							<Button style={css.socialBtn} onPress={()=>navigation.navigate('Social')}>
									<Image style={{width:80, height:80}} source={require('../../image/google2.png')}/>
							</Button>
							<Text style={{color: "#fff"}}>Google</Text>
						</View>
						<View style={{alignItems:"center"}}>
						<Button style={css.socialBtn} onPress={()=>navigation.navigate('Social')}>
								<Image style={{width:95, height:95}} source={require('../../image/naver.png')}/>
							</Button>
							<Text style={{color: "#fff"}}>네이버</Text>
						</View>
					</View>
				</View>
				<View style={css.loginView}>
					<Text style={{color:"#fff"}}>이미 계정이 있으신가요?</Text>
					<Text style={{color:"#fff", textDecorationLine:"underline"}} onPress={()=>navigation.navigate('Login')}>로그인하기</Text>
				</View>
			</View>
		</LinearGradient>		
	);
}

const css = StyleSheet.create({
	
	linearGradient: {
	  flex: 1
	},
	wrapView : {
		flex: 1,
		flexDirection: "column",
	},
	logoView: {
		flex: 11,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	socialView: {
		flex: 5,
		flexDirection: "column",
		alignItems: "center",
	},
	loginView: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	logo: {
		width: 120,
		height: 120,
		backgroundColor: "#fff",
		borderRadius: 20,
	},
	joinBtn: {
		width: "80%",
		height: 60,
		marginTop: 100,
		justifyContent: "center",
		borderRadius: 30,
		backgroundColor: "#fff",
	},
	socialBtn: {
		width: 95,
		height: 95,
		marginBottom: 10,
		backgroundColor: "#fff",
		borderRadius: 20,
		overflow : "hidden",
		justifyContent : "center",
		alignItems : "center"
	}
 });

export default Home;