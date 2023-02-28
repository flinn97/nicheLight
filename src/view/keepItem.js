import { Component } from 'react';
import "../App.css"
import Notes from './notes';
import TrashCan from '../pics/trash-can.png';
import ViewMedia from '../componentListNPM/viewMediaComponent';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
export default class KeepItem extends Component {
    constructor(props) {
        super(props);
        this.addnote = this.addnote.bind(this)
        this.handleClose = this.handleClose.bind(this)

        this.state={

        }

    };
    handleClose(key) {

        this.setState({ [key]: false })
      }
      addnote(obj) {
        debugger
        this.setState({ [obj.getJson()._id + "note"]: true, noteID: obj.getJson()._id, noteType: obj.getJson().type})
        this.props.app.dispatch({ operation: "cleanPrepare", operate: "update", object: obj })
      }
    render() {
        let app = this.props.app;
        let state= app.state;
        let styles= state.styles;
        let switchCase = this.props.switchCase
        let picture = this.props.picture
        return (
            <div style={{
                display: "flex", border: ".1rem solid rgba(15,15,15,.15)",
                borderStyle: "none groove none groove", width: "18vw", marginRight: ".81vw", marginLeft: ".81vw",
                flexDirection: "column", marginBottom: "2vh", padding: "2%", borderRadius: "1.5vh",
                background: "linear-gradient(to bottom, " + styles.colors.Grey2 + ", #FFFFFF",
            }}>
                {/* NAME */}
                <Link to={"../" + switchCase.slice(4)+ "/" + app.state.componentList.getComponent(switchCase.slice(4), picture.getJson().ogref, "_id")?.getJson()._id}
                    style={{
                        fontFamily: styles.fonts.fontBold, display: "flex",
                        textAlign: "left", textTransform: "capitalize", fontSize: "2.2vh", marginLeft: ".2vw", flexWrap: "wrap",
                        cursor: "pointer", textDecoration: "underline #D8D9DA 2px", marginBottom: styles.margins.marginSmallH
                    }}

                >{picture.getJson().name}</Link>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: styles.mySpawn.itemMarginLeft,
                    marginRight: styles.mySpawn.itemMarginLeft,

                }}>

                    <Link to={"../" + switchCase.slice(4)+ "/" + app.state.componentList.getComponent(switchCase.slice(4), picture.getJson().ogref, "_id")?.getJson()._id} style={{
                        cursor: "pointer"
                    }}

                    >
                        {picture&&( 
                         <ViewMedia
                             scale={0.4} media={Object.keys(picture.getJson().picURLs).length !== 0 ? Object.values(picture.getJson().picURLs) : [picture.getJson().picURL]} />)}
                    </Link>


                    <Link to={"../follow/following/" + picture.getJson().ogOwner}
                        style={{
                            fontFamily: styles.fonts.fontBold, color: "#888888",
                            fontSize: "1.78vmin", zIndex: 1, cursor: "copy", textAlign: "left",
                            marginTop: "-3.8vmin", marginBottom: "1vmin", maxWidth: "fit-content",
                            padding: ".4vmin", marginLeft: "-.4vmin"
                        }}>
                        by {picture.getJson().displayHandle}
                    </Link>


                    <hr></hr>
                    <div style={{ display: "flex", flexDirection: "column", maxHeight: "fit-content", alignContent: "flex-start", textAlign: "left", wordWrap: "break-word", maxWidth: "17vw", userSelect: "text" }}>

                        <div style={{
                            display: "flex", flexWrap: "wrap", fontFamily: styles.fonts.fontNormal,
                            maxWidth: "17vw", fontSize: "1.7vmin", alignSelf: "flex-start", justifySelf: "flex-start",
                            wordWrap: "break-word", flexWrap: "wrap",
                            wordBreak: "break-word",
                        }}>{picture.getJson().note}</div>

                        <div style={{ display: "flex", flexDirection: "row", maxWidth: "17vw", marginTop: ".61vh", alignContent: "flex-start", justifyContent: "space-between" }}>

                            <div style={{
                                ...styles.buttons.buttonComment, display: "flex", flexDirection: "row",
                                padding: ".5vh",
                                verticalAlign: "center",
                                height: "3vh",

                                borderRadius: "1vw",
                                position: "relative",
                            }} onClick={this.addnote.bind(this, picture)}>
                           
                                <div style={{

                                    marginBottom: "-.9vh",
                                    fontFamily: styles.fonts.fontNormal, fontSize: "1.7vmin",
                                    color: styles.colors.linkVisitedColor, fontWeight: "700",
                                }}> Add Note </div>
                            </div>
                            <div style={{ cursor: "pointer", }}
                                onClick={app.dispatch.bind(this, { popupSwitch: "keepDel", objForDelete: picture })}
                            ><img style={{
                                height: styles.fonts.fontHeader1,
                                width: "fit-content", padding: "2px", marginRight: "-.5vw",
                            }} src={TrashCan} /></div>
                        </div></div>
                    {this.state[picture.getJson()._id + "note"] && (<Notes noteID={this.state.noteID} noteType={this.state.noteType} updaterKey="update" app={app} obj={picture} handleClose={this.handleClose.bind(this, picture.getJson()._id + "note")} />)}
                </div></div>
        )
    }
}