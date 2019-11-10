import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { get } from '../../../../RESTful_API';


const MemberTypeIconStatus = (props) => {

    // const [share, setShare] = useState(null)

    // useEffect((updateShare))

    // const updateShare = () => {
    //     get.share.id(props.status.share.id).then((data) => {
    //         setShare(data)
    //     })
    // }

    return (
        <React.Fragment>
            <Grid container style={{
                width: 'min-content',
                position: 'absolute',
                top: '100px',

            }} >
                <Avatar
                    alt="Remy Sharp"
                    src={props.share !== null ? props.share.owner.profile.photoURL : null}
                    className={props.classes.mediumAvatar}
                    style={{
                        border: '4px solid #fff',
                        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                    }}
                />
                {props.share !== null
                    ? (<React.Fragment>
                        {props.share.member !== undefined
                            ? (<React.Fragment>
                                {Object.keys(props.share.member).map((key) => (
                                    <React.Fragment>
                                    {key !== props.share.owner.id 
                                    ?(<Avatar
                                        alt="Remy Sharp"
                                        src={props.share.member[key].profile.photoURL}
                                        className={props.classes.mediumAvatar}
                                        style={{
                                            border: '4px solid #fff',
                                            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                        }}
                                    />)
                                    :(<React.Fragment></React.Fragment>)
                                    }
                                    </React.Fragment>
                                ))}

                            </React.Fragment>)
                            : (<React.Fragment></React.Fragment>)}
                    </React.Fragment>)
                    : (<React.Fragment></React.Fragment>)}
            </Grid>
        </React.Fragment>
    )
}


const styles = {
    mediumAvatar: {
        margin: '5px 10px',
        width: 45,
        height: 45,
    }
}

MemberTypeIconStatus.propTypes = {
    uid: PropTypes.string
}

export default withStyles(styles)(MemberTypeIconStatus)