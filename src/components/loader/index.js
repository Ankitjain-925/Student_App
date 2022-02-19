import React from 'react';
import { Grid } from '@material-ui/core';



class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }



    render() {
        return (
            <div>

                <Grid container >
                    <Grid item xs={2}>
                        <p>xs=8</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p>xs=4</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p>xs=4</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p>xs=8</p>
                    </Grid>
                </Grid>
            </div>

        )
    }
}


export default Index;