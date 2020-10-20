import React from "react";
import AuthComponent from './oauth2'
class Authorize extends React.Component{
    constructor(props) {
        super(props);
        this.store = this.props.Fuctori;
    }

    render() {

        return(
            <div>
                <AuthComponent Fuctori={this.store} />
            </div>
        )
    }
}
export default Authorize;