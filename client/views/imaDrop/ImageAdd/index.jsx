import React, {Component} from "react"
import {EditorState} from "draft-js"

export default class ImageAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: ''
        }
        this.add = this.add.bind(this)
        this.changeUrl = this.changeUrl.bind(this)
    }

    add() {
        if(this.state.url === "") return  // todo 这里做图片地址合法性的校验
        let editorState = this.props.modifier(this.props.editorState, this.state.url, {name:'haha'})
        this.props.onChange(editorState)
    }

    changeUrl(e) {
        this.setState({
            url: e.target.value
        })
    }

    render() {
        return(
            <div>
                <input onChange={this.changeUrl} value={this.state.url} type="text"/>
                <button onMouseDown={this.add}>add</button>
            </div>

        )
    }
}