import * as React from 'react'
import { View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { Header,Icon } from 'react-native-elements'
import {RFValue} from 'react-native-responsive-fontsize'
import axios from 'axios'

export default class HomeScreen extends Component{
    constructor(){
        super()
        this.state={
            articleDetails:{}
        }
    }

    getArticle=()=>{
        const url = 'http://localhost:5000/get-article'
        axios 
        .get(url)
        .then(response=>{
            let details = response.data.data
            details['contentId'] = details.contentId
            this.setState({
                articleDetails:details
            })
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    componentDidMount(){
        this.getArticle()
    }

    likedArticles=()=>{
        const url = 'http://localhost:5000/liked-article'
        axios
        .post(url)
        .then(response=>{
            this.getArticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    unlikedArticles=()=>{
        const url = 'http://localhost:5000/unliked-article'
        axios
        .post(url)
        .then(response=>{
            this.getArticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    didNotReadArticles=()=>{
        const url = 'http://localhost:5000/did-not-read-article'
        axios
        .post(url)
        .then(response=>{
            this.getArticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    render(){
        const {articleDetails} = this.state
        if(articleDetails.title){
            const{
                title,
                url,
                lang,
                contentId,
                authorPersonId,
                total_events
            } = articleDetails
            return(
                <View style = {styles.container}>
                    <View style = {styles.headerContainer}>
                        <Header centerComponent = {{text:'Article App',style:styles.headerTitle}}
                        rightComponent={{icon:'search',color:'black'}}
                        backgroundColor = {'lightyellow'}
                        containerStyle = {{flex:1}}/> 
                    </View>
                    <View style = {styles.subContainer}>
                        <View style = {styles.subTopContainer}>
                            <View style = {styles.upperBottomContainer}>
                                <Text style = {styles.title}>{title}</Text>
                            </View>
                            <View style = {styles.middleBottomContainer}>
                                <View style = {{flex:0.3}}>
                                    <Text style = {styles.overview}>Language: {lang}</Text>
                                </View>
                                <View style = {{flex:0.7,padding:15}}>
                                    <Text style = {styles.overview}>Total Events: {total_events}</Text>
                                </View>
                            </View>
                            <View style = {styles.lowerBottomContainer}>
                                <View style = {styles.iconButtonContainer}>
                                    <TouchableOpacity onPress = {this.likedArticles}>
                                        <Icon reverse
                                        name = {'check'}
                                        type = {'entypo'}
                                        size = {RFValue(30)}
                                        color = {'blue'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress = {this.unlikedArticles}>
                                        <Icon reverse
                                        name = {'cross'}
                                        type = {'entypo'}
                                        size = {RFValue(30)}
                                        color = {'red'}/>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.ButtonContainer}>
                                    <TouchableOpacity style = {styles.button}
                                    onPress = {this.didNotReadArticles}>
                                        <Text style = {styles.buttonText}>Did Not read</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return null
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "black",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    middleBottomContainer: {
      flex: 0.35,
      marginTop:65
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      fontWeight: "300",
      color: "gray",
      margin:10
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    buttonCotainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold"
    }
});
