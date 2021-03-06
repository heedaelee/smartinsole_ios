import React from 'react';
import styled from 'styled-components';
import { View, Text, Dimensions } from 'react-native';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const WEEK_ENUM = ["첫째주","둘째주","셋째주","넷째주","다섯째주","여섯째주"];
const FakeDB = [
    {L:{temp : 80, press : 60},R:{temp : 72, press : 85}},
    {L:{temp : 60, press : 70},R:{temp : 18, press : 73}},
    {L:{temp : 76, press : 45},R:{temp : 25, press : 25}},
    {L:{temp : 82, press : 57},R:{temp : 46, press : 18}},
    {L:{temp : 86, press : 72},R:{temp : 38, press : 94}},
    {L:{temp : 58, press : 49},R:{temp : 75, press : 78}}
];

function Chart({swap, selectWeek}) {
    return (
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            {
                FakeDB.map((values,index) => (
                    <ValueColumn key={index}>
                        <BarView opacity={index === selectWeek?true:false}>
                            <Bar L style={{height:`${swap?values.L.temp:values.L.press}%`}}/>
                            <Bar R style={{height:`${swap?values.R.temp:values.R.press}%`}}/>
                        </BarView>
                        <WeekView>
                            <WeekText>{index+1}</WeekText>
                            <WeekText>{WEEK_ENUM[index]}</WeekText>
                        </WeekView>
                    </ValueColumn>
                ))
            }
            <HorizonLine />
            <Category>
                <Circle L/><WeekText>왼쪽</WeekText>
                <Circle R/><WeekText>오른쪽</WeekText>
            </Category>
        </View>
    )
}

const ValueColumn = styled.View`
    width : 16%;
    height : ${_HEIGHT/3}px;
    justify-content : center;
`;
const BarView = styled.View`
    width : 100%;
    height : ${_HEIGHT/5}px;
    flex-direction : row;
    justify-content : center;
    align-items : flex-end;
    opacity : ${props=>props.opacity?1:0.3};
`;
const WeekView = styled.View`
    width : 100%;
    height : ${_HEIGHT/13}px;
    padding-top : ${_HEIGHT/36}px;
    align-items : center;
`;
const WeekText = styled.Text`
    font-size : ${_WIDTH/40}px;
`;
const Bar = styled.View`
    width : 30%
    margin-right : 3px;
    border-radius : 10px;
    background-color : ${props=>props.L?"#FF807F":"#7798FE"};
`;
const HorizonLine = styled.View`
    width : 95%;
    height : 1px;
    background-color : black;
    position : absolute;
    bottom : ${_HEIGHT*0.087}px;
`;
const Category = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : center;
    position : absolute;
    bottom : 5px;
`;
const Circle = styled.View`
    width : ${_WIDTH/32}px;
    height :${_WIDTH/32}px;
    margin : 1px 3px;
    background-color : ${props=>props.L?"#FF807F":"#7798FE"};
    border-radius : 50px;
`;

export default Chart;